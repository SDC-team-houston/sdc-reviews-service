const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("We're connected!");
});

const result = db.combined_reviews
  .aggregate([
    { $match: { id: 5 } },
    {
      $project: {
        body: 1,
        id: 1,
        date: 1,
        helpfulness: 1,
        photos: { id: 1, url: 1 },
        product_id: 1,
        rating: 1,
        recommend: 1,
        reported: 1,
        response: 1,
        reviewer_email: 1,
        reviewer_name: 1,
        summary: 1,
      },
    },
    {
      $merge: {
        into: {
          db: 'Test',
          coll: 'project_test',
        },
      },
    },
  ])
  .pretty();

console.log(result);

// myDB.reviews.aggregate([
//   { $limit: 5 },
//   {
//     $merge: {
//       into: test,
//     },
//   },
// ]);

// db.test.aggregate([
//   { $addFields: { photos: [] } },
//   { $merge: { into: 'test' } },
// ]);

// db.test.aggregate([
//   {
//     $lookup: {
//       from: 'reviews_photos',
//       localField: 'id',
//       foreignField: 'review_id',
//       as: 'photos',
//     },
//   },
// ]);

// db.reviews.aggregate([
//   {
//     $lookup: {
//       from: 'reviews_photos',
//       localField: 'id',
//       foreignField: 'review_id',
//       as: 'photos',
//     },
//   },
//   { $merge: { into: 'combined_reviews' } },
// ]);
