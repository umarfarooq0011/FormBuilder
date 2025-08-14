import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from 'express-rate-limit';
import formRoutes from './Routes/formRoutes.js';
import publicRoutes from './Routes/publicRoutes.js';




dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(morgan('dev'));

const submitLimiter = rateLimit({ windowMs: 60 * 1000, max: 30 });

app.use('/api/forms', formRoutes);
app.use('/api/public', submitLimiter, publicRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});



const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("FORM BUILDER PROJECT");
});


app.listen(PORT, async()=>{
    connectDB();
    console.log(`SERVER is running on http://localhost:${PORT}`);
})