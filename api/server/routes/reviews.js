const express = require('express');
const Reviews = require('../controllers/reviewsController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const queryResult = await Reviews.read(req.query);
    res.send(queryResult);
  } catch (err) {
    console.err(err);
  }
});

router.post('/', (req, res) => {
  const { body } = req;
  body.date = new Date();
  body.helpfulness = 0;
  body.reported = false;

  console.log(body);
  const review = new CombinedReview(body);
  review.save((err, newReview) => {
    if (err) {
      res.end();
      console.error(err);
      return;
    }
    res.send(newReview);
  });
});

// router.get('/meta', (req, res) => {
//   res.send('Getting /reviews/meta');
// });

router.put('/:review_id/helpful', (req, res) => {
  res.send('Getting /reviews/:review_id/helpful');
});

router.put('/:review_id/report', (req, res) => {
  res.send('Getting /reviews/:review_id/report');
});

module.exports = router;
