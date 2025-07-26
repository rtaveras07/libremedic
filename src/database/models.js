// Import all models first
import User from '../models/User';
import Patient from '../models/patients';
import MedicalCenter from '../models/medical_center';
import Prescription from '../models/prescriptions';
import Diagnostic from '../models/diagnostics';

import UserSetting from '../models/user_setting';

// Establish relationships after all models are imported
// This prevents circular import issues

// User relationships
User.hasMany(Patient, { foreignKey: 'userId' });
Patient.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(MedicalCenter, { foreignKey: 'userId', onDelete: 'CASCADE' });
MedicalCenter.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.hasMany(Prescription, { foreignKey: 'prescribedBy' });
Prescription.belongsTo(User, { foreignKey: 'prescribedBy' });

User.hasMany(Diagnostic, { foreignKey: 'doctorId', as: 'Diagnostics' });
Diagnostic.belongsTo(User, { foreignKey: 'doctorId', as: 'Doctor' });

User.hasMany(UserSetting, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserSetting.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Patient relationships
Patient.hasMany(Prescription, { foreignKey: 'patientId' });
Prescription.belongsTo(Patient, { foreignKey: 'patientId' });

Patient.hasMany(Diagnostic, { foreignKey: 'patientId', as: 'Diagnostics' });
Diagnostic.belongsTo(Patient, { foreignKey: 'patientId', as: 'Patient' });

// Export all models
export {
  User,
  Patient,
  MedicalCenter,
  Prescription,
  Diagnostic,

  UserSetting
};

export default {
  User,
  Patient,
  MedicalCenter,
  Prescription,
  Diagnostic,
 
  UserSetting
}; 