import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Налаштування змінних середовища
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://FreeSky:AlexSky1@cluster0.1ur9i7t.mongodb.net/'
//'mongodb+srv://FreeSky:AlexSky1@cluster0.ovhmhz2.mongodb.net/admin?retryWrites=true&w=majority';

// Підключення до бази даних
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
