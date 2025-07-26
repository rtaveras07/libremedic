import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

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
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'patients'
});

export default Patient;