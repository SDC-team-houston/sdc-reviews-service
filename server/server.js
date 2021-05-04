const express = require('express');
const morgan = require('morgan');
const reviews = require('./reviews');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use('/reviews', reviews);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
