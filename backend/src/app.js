import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './models/index.js';
import uploadRoutes from './routes/uploadRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRoutes);
app.use('/api/analyses', analysisRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to init DB:', err);
    process.exit(1);
  });
