import mongoose from 'mongoose';
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;