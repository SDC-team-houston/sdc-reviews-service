const Review = require('../models/ReviewModel');

const read = ({
  page = 1,
  product_id: productId,
  count = 5,
  sort = 'helpful',
}) => {
  return new Promise((resolve, reject) => {
    const sortOptions = sort === 'helpful' ? { helpfulness: -1 } : { date: -1 };
    const findOptions = productId ? { product_id: Number(productId) } : {};

    Review.find(findOptions)
      .limit(Number(count))
      .sort(sortOptions)
      .exec((err, reviews) => {
        if (err) {
          reject(err);
        }
        resolve({
          product: productId,
          page,
          count,
          results: reviews,
        });
      });
  });
};

const create = (body) => {
  return new Promise((resolve, reject) => {
    body.date = new Date();
    body.helpfulness = 0;
    body.reported = false;

    const review = new Review(body);
    review.save((err, newReview) => {
      if (err) {
        reject(err);
      }
      resolve(newReview);
    });
  });
};

module.exports = {
  read,
  create,
};
