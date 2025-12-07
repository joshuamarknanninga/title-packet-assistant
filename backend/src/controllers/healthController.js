// backend/src/controllers/healthController.js
import { sequelize } from '../models/index.js';

export const healthCheck = async (req, res) => {
  let dbStatus = 'unknown';

  try {
    await sequelize.authenticate();
    dbStatus = 'ok';
  } catch (err) {
    console.error('DB health check failed:', err);
    dbStatus = 'error';
  }

  const openaiStatus = process.env.OPENAI_API_KEY ? 'configured' : 'missing_api_key';

  res.json({
    status: 'ok',
    db: dbStatus,
    openai: openaiStatus
  });
};
