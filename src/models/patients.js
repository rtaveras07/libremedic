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
  identificationNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true
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
    unique: true,
    allowNull: false
  }
}, {});

User.hasMany(Patient);
Patient.belongsTo(User);

export default Patient;