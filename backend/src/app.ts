import express from "express";
import {config} from "dotenv";
import morgan from 'morgan';
import appRouter from "./routes";
import cookieParser from 'cookie-parser'

config(); // with the help of thsi we can connect our database securely
const app = express();


// GET - when we want to get get from database

// PUT ->  if we want to update the data we use put

// POST- when we create new post

// DELETE

//middlewares
app.use(express.json()); // it is used to read the data from user in the form of json
app.use(cookieParser(process.env.COOKIE_SECRET))
// remove morgan it in production but we used it in development mode for lock when api request is send to backend
app.use(morgan("dev"));

app.use("/api/v1",appRouter);



export default app;
