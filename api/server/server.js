const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const reviews = require('./reviews');
// const db = require('./db');

mongoose.connect('mongodb://mongo/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("We're connected!");
});

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use('/reviews', reviews);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
