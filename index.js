// index.js (Node server)
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve static files from the "public" folder
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/core')));
app.use(express.static(path.join(__dirname, 'examples', 'todomvc')));

// Default route -> index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'examples', 'todomvc', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
