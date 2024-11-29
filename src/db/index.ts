import mongoose from "mongoose";

const dbConnection = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url as string);
    console.log(`Connected to ${url}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(`Failed to connect to`);
  }
};

export default dbConnection;
