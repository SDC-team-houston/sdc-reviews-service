const express = require('express');
const Reviews = require('../controllers/reviewsController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const queryResult = await Reviews.read(req.query);
    res.send(queryResult);
  } catch (err) {
    console.error(err);
    res.end();
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const queryResult = await Reviews.create(body);
    res.send(queryResult);
  } catch (err) {
    console.error(err);
    res.end();
  }
});

router.get('/meta', (req, res) => {
  res.send('Getting /reviews/meta');
});

router.put('/:review_id/helpful', async (req, res) => {
  try {
    const reviewId = req.params.review_id;
    const queryResult = await Reviews.addOneToHelpfulness(reviewId);
    res.send(queryResult);
  } catch (err) {
    console.error(err);
    res.end;
  }
});

router.put('/:review_id/report', (req, res) => {
  res.send('Getting /reviews/:review_id/report');
});

module.exports = router;
