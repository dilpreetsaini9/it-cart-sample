import 'dotenv/config'
import cors from 'cors';
import express from "express";
import mongoose from 'mongoose';


// my imports
import { api } from './routes/frontPageRoutes.js';

const app = express()

// connecting to mongoDB and listing to port

mongoose.connect(process.env.MONGOURI)
    .then(() => {
        console.log('MONGO - 200');
        app.listen(process.env.PORT, () => {
            console.log(`PORT - ${process.env.PORT} `);

        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// cors 
app.use(cors());


// all routes
app.use("/api/v1", api)


// route for static images ( public )
app.use("/photos", express.static('uploads'))


// handle invalid routes
app.use("*", (req, res) => {
    res.status(404).json({ "message": "error 404" })
})
