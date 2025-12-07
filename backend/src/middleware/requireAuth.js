// backend/src/middleware/requireAuth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    next(err);
  }
};

