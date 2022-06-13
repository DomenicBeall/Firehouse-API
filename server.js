const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// Globals
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use(require('./routes'))

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});