import { sequelize } from '../config/db.js';
import { File } from './File.js';
import { Analysis } from './Analysis.js';
import { User } from './User.js';

export { sequelize, File, Analysis, User };

export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true }); // dev only
};
