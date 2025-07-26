import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Patient from './patients';
import User from './User';
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
  
});
// Relationships with patients and users

Diagnostic.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });

Diagnostic.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
// Assuming you have a User model, you can also define the relationship
User.hasMany(Diagnostic, { foreignKey: 'userId', onDelete: 'CASCADE' });
// If you have a Clinic model, import it here

export default Diagnostic; 