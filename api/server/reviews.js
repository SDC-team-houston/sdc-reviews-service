const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Getting /reviews');
});

router.post('/', (req, res) => {
  res.send('Posting /reviews');
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
