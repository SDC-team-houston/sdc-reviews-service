const mongoose = require('mongoose');

const mongoDB = 'mongodb://mongo/Test';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
