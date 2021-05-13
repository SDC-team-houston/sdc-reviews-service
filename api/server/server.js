const express = require('express');
const morgan = require('morgan');
const path = require('path');
const reviews = require('./routes/reviews');
require('./db');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use(express.json());

app.use('/reviews', reviews);

app.get('/loaderio-99c02dac162d5c22343b94833afbd2cc.txt', (req, res) => {
  res.sendFile('loaderio-99c02dac162d5c22343b94833afbd2cc.txt', {
    root: path.join(__dirname, 'assets'),
  });
});

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});
