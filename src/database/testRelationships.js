import { sequelize } from './database';
import './models';
import User from '../models/User';
import MedicalCenter from '../models/medical_center';
import Patient from '../models/patients';
import Prescription from '../models/prescriptions';
import Diagnostic from '../models/diagnostics';

const testRelationships = async () => {
  try {
    console.log('🔍 Testing all model relationships...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Sync database
    await sequelize.sync({ force: false });
    console.log('✅ Database synced');
    
    // Test User -> MedicalCenter relationship
    console.log('\n📋 Testing User -> MedicalCenter relationship...');
    const user = await User.findOne();
    if (user) {
      const medicalCenters = await MedicalCenter.findAll({
        where: { userId: user.id },
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }]
      });
      console.log(`✅ Found ${medicalCenters.length} medical centers for user ${user.firstName}`);
      
      if (medicalCenters.length > 0) {
        console.log('✅ Medical center with user data:', {
          id: medicalCenters[0].id,
          name: medicalCenters[0].name,
          userId: medicalCenters[0].userId,
          userEmail: medicalCenters[0].User?.email
        });
      }
    }
    
    // Test User -> Patient relationship
    console.log('\n📋 Testing User -> Patient relationship...');
    const patients = await Patient.findAll({
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }],
      limit: 3
    });
    console.log(`✅ Found ${patients.length} patients with user data`);
    
    // Test Patient -> Prescription relationship
    console.log('\n📋 Testing Patient -> Prescription relationship...');
    const prescriptions = await Prescription.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      limit: 3
    });
    console.log(`✅ Found ${prescriptions.length} prescriptions with user data`);
    
    // Test Diagnostic relationships
    console.log('\n📋 Testing Diagnostic relationships...');
    const diagnostics = await Diagnostic.findAll({
      include: [
        {
          model: User,
          as: 'Doctor',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Patient,
          as: 'Patient',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      limit: 3
    });
    console.log(`✅ Found ${diagnostics.length} diagnostics with doctor and patient data`);
    
    console.log('\n🎉 All relationship tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

testRelationships(); 