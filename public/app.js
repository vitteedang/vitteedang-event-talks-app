document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('category-search');
    let fullSchedule = [];

    // Fetch schedule data from the API
    fetch('/api/schedule')
        .then(response => response.json())
        .then(data => {
            fullSchedule = data;
            renderSchedule(fullSchedule);
        })
        .catch(error => {
            console.error('Error fetching schedule:', error);
            scheduleContainer.innerHTML = '<div class="error">Failed to load schedule. Please try again later.</div>';
        });

    // Handle search/filter logic
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (!searchTerm) {
            renderSchedule(fullSchedule);
            return;
        }

        const filtered = fullSchedule.map(item => {
            // If it's not a talk (transition or break), we keep it visible as requested
            if (item.type !== 'talk') {
                return { ...item, visible: true };
            }

            // Check if any category matches the search term
            const matches = item.categories.some(cat => cat.toLowerCase().includes(searchTerm));
            return { ...item, visible: matches };
        });

        renderSchedule(filtered);
    });

    function renderSchedule(items) {
        scheduleContainer.innerHTML = '';

        items.forEach(item => {
            // Skip rendering if explicitly marked as hidden by search
            if (item.visible === false) return;

            const card = document.createElement('div');
            card.className = `card ${item.type}`;

            let innerHTML = `
                <span class="time-tag">${item.startTime} - ${item.endTime}</span>
            `;

            if (item.type === 'talk') {
                innerHTML += `
                    <h2>${item.title}</h2>
                    <div class="speakers">🎤 ${item.speakers.join(', ')}</div>
                    <p class="description">${item.description}</p>
                    <div class="categories">
                        ${item.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                `;
            } else if (item.type === 'break') {
                innerHTML += `
                    <h2>☕ ${item.title}</h2>
                    <p class="description">${item.description}</p>
                `;
            } else if (item.type === 'transition') {
                innerHTML += `
                    <span>🔄 10m Transition Block</span>
                `;
            }

            card.innerHTML = innerHTML;
            scheduleContainer.appendChild(card);
        });

        if (scheduleContainer.innerHTML === '') {
            scheduleContainer.innerHTML = '<div class="no-results">No talks found for that category.</div>';
        }
    }
});
