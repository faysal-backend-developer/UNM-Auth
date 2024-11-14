import mongoose from 'mongoose';

const dbConnection = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log(`DB connection established with connection String: ${url}`);
  } catch (error) {
    console.log(`Error: Database Connection Error: ${error}`);
  }
};

export default dbConnection;
