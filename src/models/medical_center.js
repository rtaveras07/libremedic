import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import User from './User';
import Patient from './patients';

const MedicalCenter = sequelize.define('medical_centers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  website: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  image_url: {
    type: Sequelize.TEXT,
    allowNull: true
  },
   
}, {
  timestamps: true,
  tableName: 'medical_centers'
});

// Define relationships
User.hasMany(MedicalCenter, { foreignKey: 'patientId', onDelete: 'CASCADE' });
MedicalCenter.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });

export default MedicalCenter;