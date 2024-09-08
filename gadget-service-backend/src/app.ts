import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import messageRoutes from './routes/messageRoutes';
import callRequestRoutes from './routes/callRequestRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/call-requests', callRequestRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
