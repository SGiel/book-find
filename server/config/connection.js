const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book-find', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

// below came from AskBCS to track if connect to MongoDB -- helped track Heroku log
mongoose.connection.on('connected', () =>
  console.log('Connected to MongoDB Endpoint')
);

mongoose.connection.on('error', (err) =>
  console.log(`Mongoose default connection error: ${err}`)
);


module.exports = mongoose.connection;
