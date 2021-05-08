const express = require('express');
const morgan = require('morgan');
const reviews = require('./routes/reviews');
require('./db');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use(express.json());

app.use('/reviews', reviews);

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});
