import { sequelize } from '../config/db.js';
import { File } from './File.js';
import { Analysis } from './Analysis.js';

export { sequelize, File, Analysis };

export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true }); // dev only; change to false in prod
};
