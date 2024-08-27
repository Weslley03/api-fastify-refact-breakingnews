import { connect } from "mongoose"
import * as dotenv from 'dotenv';
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectDB = async () => {
  try{
    await connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.b3uma5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    console.log('mongoDB connected successfully');
}catch(err){
    console.error('mongoDB connection error:', err);
    process.exit(1);
  };
};

export default connectDB;