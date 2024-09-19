import express from "express";
import {config} from "dotenv";
config(); // with the help of thsi we can connect our database securely
const app = express();


// GET - when we want to get get from database

// PUT ->  if we want to update the data we use put

// POST- when we create new post

// DELETE

//middlewares
app.use(express.json()); // it is used to read the data from user in the form of json


//connections and listners

export default app;
