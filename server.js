import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import gameRoutes from './routes/gameRoutes.js';
import './crone.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', gameRoutes);

mongoose
  .connect(process.env.DB_HOST, {})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
