import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";


dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("FORM BUILDER PROJECT");
});


app.listen(PORT, async()=>{
    connectDB();
    console.log(`SERVER is running on http://localhost:${PORT}`);
})