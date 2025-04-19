import {config} from 'dotenv'
config();
import mongoose from "mongoose";
import {app} from './app.js';

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
  process.exit(1); 
});

const port = process.env.PORT || 4000;


const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});