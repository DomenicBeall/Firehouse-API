const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// Globals here
const PORT = 8080;

/* Middleware here */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes here
const houses = require('./routes/houses');
app.use(houses);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});