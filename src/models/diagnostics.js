import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
 
import Patient from './patients';

const Diagnostic = sequelize.define('diagnostics', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diagnosis: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  symptoms: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  treatment: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  diagnosisDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  followUpDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('active', 'resolved', 'pending'),
    allowNull: false,
    defaultValue: 'active'
  },
  severity: {
    type: Sequelize.ENUM('low', 'medium', 'high', 'critical'),
    allowNull: false,
    defaultValue: 'medium'
  },
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'patients',
      key: 'id'
    }
  },
   
}, {
  timestamps: true,
  tableName: 'diagnostics'
});

 
Patient.hasMany(Diagnostic, { foreignKey: 'patientId', as: 'Diagnostics' });
Diagnostic.belongsTo(Patient, { foreignKey: 'patientId', as: 'Patient' });

export default Diagnostic; 