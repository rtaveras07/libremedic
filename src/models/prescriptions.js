import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Prescription = sequelize.define('prescriptions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  medication: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dosage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  frequency: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  instructions: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  prescribedBy: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {});

export default Prescription;