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

app.get('/loaderio-a1f29fdf0fc47fb46f03e519261199e6.txt', (req, res) => {
  res.sendFile('loaderio-a1f29fdf0fc47fb46f03e519261199e6.txt', {
    root: path.join(__dirname, 'assets'),
  });
});

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});
