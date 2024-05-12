import mongoose from 'mongoose';

//Establish the connection between app and mongoDbB
export const connectToDatabase = async () => {
  //get the uri from .env
  const mongoUri = process.env.MONGODB_URI;

  //check the uri exist or not
  if (!mongoUri) {
    console.log('MongoDB connection URI (MONGODB_URI) is not set!');
    throw 'Missing MongoDB connection URI';
  }

  try {
    //build the connection with db
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB database');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application on connection failure
  }
};
