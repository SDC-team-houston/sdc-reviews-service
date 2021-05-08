const Review = require('../models/reviewsModel');

const read = ({
  page = 1,
  product_id: productId,
  count = 5,
  sort = 'helpful',
}) => {
  return new Promise((resolve, reject) => {
    const sortOptions = sort === 'helpful' ? { helpfulness: -1 } : { date: -1 };
    const findOptions = productId ? { product_id: Number(productId) } : {};
    const countOptions = Number(count);

    Review.find(findOptions)
      .limit(countOptions)
      .sort(sortOptions)
      .exec((err, reviews) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            product: productId,
            page,
            count,
            results: reviews,
          });
        }
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
      } else {
        resolve(newReview);
      }
    });
  });
};

const addOneToHelpfulness = (reviewId) => {
  return new Promise((resolve, reject) => {
    const conditions = { id: reviewId };
    const update = { $inc: { helpfulness: 1 } };

    Review.updateOne(conditions, update).exec((err, review) => {
      if (err) {
        reject(err);
      } else {
        resolve(review);
      }
    });
  });
};

module.exports = {
  read,
  create,
  addOneToHelpfulness,
};
