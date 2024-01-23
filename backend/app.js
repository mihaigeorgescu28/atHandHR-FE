// app.js
import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import emailController from './controllers/emailController.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware for CORS
app.use(cors());

// Use controllers
app.use('/emails', emailController); // Make sure the path is correct

// Other middleware or configurations can be added here

export default app;
