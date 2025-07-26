import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import User from './User';

// If you have a Clinic model, import it here
// import Clinic from './Clinic';

const UserSetting = sequelize.define('user_settings', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // SERIAL PRIMARY KEY
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  clinic_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'clinics',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  header_image_url: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  stamp_image_url: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  signature_image_url: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  exequatur_number: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false,
  tableName: 'user_settings',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'clinic_id']
    }
  ]
});

User.hasMany(UserSetting, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserSetting.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// If you have a Clinic model, you can add associations like:
// Clinic.hasMany(UserSetting, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });
// UserSetting.belongsTo(Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });

export default UserSetting;