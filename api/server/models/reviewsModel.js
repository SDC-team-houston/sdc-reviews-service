const mongoose = require('mongoose');

const combinedReviewSchema = new mongoose.Schema({
  body: {
    type: 'String',
  },
  date: {
    $date: {
      type: 'Date',
    },
  },
  helpfulness: {
    type: 'Number',
  },
  id: {
    type: 'Number',
  },
  photos: {
    type: ['Mixed'],
  },
  product_id: {
    type: 'Number',
  },
  rating: {
    type: 'Number',
  },
  recommend: {
    type: 'Boolean',
  },
  reported: {
    type: 'Boolean',
  },
  response: {
    type: 'String',
  },
  reviewer_email: {
    type: 'String',
  },
  reviewer_name: {
    type: 'String',
  },
  summary: {
    type: 'String',
  },
});

module.exports = mongoose.model('combined_review', combinedReviewSchema);
