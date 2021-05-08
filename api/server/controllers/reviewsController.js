const Reviews = require('../models/reviewsModel');

const read = ({
  page = 1,
  product_id: productId,
  count = 5,
  sort = 'helpful',
}) =>
  new Promise((resolve, reject) => {
    const sortOptions = sort === 'helpful' ? { helpfulness: -1 } : { date: -1 };
    const findOptions = productId ? { product_id: Number(productId) } : {};

    Reviews.find(findOptions)
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

module.exports = {
  read,
};
