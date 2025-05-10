import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userModel from '../src/models/register/model_register.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.post('/api/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    const result = await userModel.createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
