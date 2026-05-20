const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get the schedule data
app.get('/api/schedule', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            return res.status(500).json({ error: 'Failed to read schedule data' });
        }
        try {
            const schedule = JSON.parse(data);
            res.json(schedule);
        } catch (parseErr) {
            console.error('Error parsing data.json:', parseErr);
            res.status(500).json({ error: 'Failed to parse schedule data' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
