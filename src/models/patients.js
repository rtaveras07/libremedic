import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import User from './User';
const Patient = sequelize.define('patients', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  emergencyContact: {
    type: Sequelize.STRING,
    allowNull: true
  },
  emergencyPhone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  bloodType: {
    type: Sequelize.STRING,
    allowNull: true
  },
  allergies: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  medicalHistory: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'patients'
});
//relationships user
Patient.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Patient, { foreignKey: 'userId', onDelete: 'CASCADE' });


export default Patient;