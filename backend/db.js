// db.js
import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config({ path: 'C:/Users/mihai/source/repos/atHandHR/backend/.env' });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export default db;
