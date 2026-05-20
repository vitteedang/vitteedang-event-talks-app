# Tech Event Website

A simple web application to display a schedule for a tech event. The application uses a Node.js Express server to serve static files and an API endpoint for schedule data.

## Features

- **Event Schedule:** Displays a list of talks, speakers, times, and descriptions.
- **Dynamic Data:** Schedule information is served from a JSON file (`data.json`).
- **Responsive Design:** A clean, modern interface that works across different devices.

## Project Structure

```text
tech-event-website/
├── public/             # Static assets (HTML, CSS, JS)
│   ├── index.html      # Main entry point
│   ├── style.css       # Frontend styling
│   └── app.js          # Frontend logic
├── server.js           # Node.js Express server
├── data.json           # Schedule data source
├── package.json        # Project dependencies and scripts
└── .gitignore          # Git ignore rules
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vitteedang/vitteedang-event-talks-app.git
   cd vitteedang-event-talks-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   node server.js
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

- `GET /api/schedule`: Returns the event schedule as a JSON object.

## Customization

To update the event schedule, modify the `data.json` file in the root directory. The application will automatically serve the updated data on the next request.

## License

This project is licensed under the ISC License.
