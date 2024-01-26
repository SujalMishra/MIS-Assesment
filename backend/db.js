const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sujalmishra374:chotu123@cluster1.h5pe0ri.mongodb.net/Ride_Sharing?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    console.log('MongoDB Connected...')

  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  } 
};

module.exports = mongoDB;
