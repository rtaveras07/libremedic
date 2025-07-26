import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import User from './User';
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
   
},  );
// relationships with user
// Assuming you have a User model

MedicalCenter.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(MedicalCenter, { foreignKey: 'userId', onDelete: 'CASCADE' });


export default MedicalCenter;