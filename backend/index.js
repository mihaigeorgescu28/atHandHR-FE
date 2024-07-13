import express from "express"
import mysql from "mysql"
import cors from "cors"
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import multer from "multer";
import path from "path";
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';


import app from "./app.js";
import db from "./db.js";
import emailController from "./controllers/emailController.js";
import userController from "./controllers/userController.js";
import timeManagementController from "./controllers/timeManagementController.js";
import leaveController from "./controllers/leaveController.js";
import siteMapController from "./controllers/siteMapController.js";
import { setupStaticFileServer } from './utils/utils.js';


app.use('/emails', emailController);
app.use('/user', userController);
app.use('/timeManagement', timeManagementController);
app.use('/leave', leaveController);
app.use('/sitemap', siteMapController);

// if auth problems run this -> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ROOTPW';

// Middleware to parse JSON
app.use(express.json())
// Middleware for CORS
app.use(cors()) 

// Set up static file server
setupStaticFileServer(app);
    
app.listen(8800, () => {
    console.log("Connected to backend")
})