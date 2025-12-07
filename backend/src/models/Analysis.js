import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { File } from './File.js';

export const Analysis = sequelize.define('Analysis', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  fileId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  jsonData: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  humanSummary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requirements: {
    type: DataTypes.JSONB, // array of strings
    allowNull: false,
    defaultValue: [],
  },
  exceptions: {
    type: DataTypes.JSONB, // array of strings
    allowNull: false,
    defaultValue: [],
  }
});

File.hasOne(Analysis, { foreignKey: 'fileId', onDelete: 'CASCADE' });
Analysis.belongsTo(File, { foreignKey: 'fileId' });
