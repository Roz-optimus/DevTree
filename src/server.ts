import router from './router';
import express from 'express';
import 'dotenv/config';
import {connectDB} from './config/db';

const app = express();

connectDB();



app.use(express.json());

app.use('/', router);   // <== Use router

export default app;