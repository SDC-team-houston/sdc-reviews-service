const express = require('express');
const Reviews = require('../controllers/reviewsController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const queryResult = await Reviews.read(req.query);
    res.send(queryResult);
  } catch (err) {
    console.error(err);
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const queryResult = await Reviews.create(body);
    res.send(queryResult);
  } catch (err) {
    console.error(err);
  }
});

router.get('/meta', (req, res) => {
  res.send('Getting /reviews/meta');
});

router.put('/:review_id/helpful', (req, res) => {
  res.send('Getting /reviews/:review_id/helpful');
});

router.put('/:review_id/report', (req, res) => {
  res.send('Getting /reviews/:review_id/report');
});

module.exports = router;
