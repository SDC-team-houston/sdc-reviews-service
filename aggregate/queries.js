myDB.reviews.aggregate([
  { $limit: 5 },
  {
    $merge: {
      into: test,
    },
  },
]);

db.test.aggregate([
  { $addFields: { photos: [] } },
  { $merge: { into: 'test' } },
]);

db.test.aggregate([
  {
    $lookup: {
      from: 'reviews_photos',
      localField: 'id',
      foreignField: 'review_id',
      as: 'photos',
    },
  },
]);

db.reviews.aggregate([
  {
    $lookup: {
      from: 'reviews_photos',
      localField: 'id',
      foreignField: 'review_id',
      as: 'photos',
    },
  },
  { $merge: { into: 'combined_reviews' } },
]);
