import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import ticketRoutes from './routes/TicketRoutes.js';
import userRoutes from './routes/UserRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes); // this must come after app.use(express.json())

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
