import { sequelize } from './database';
import './models';
import User from '../models/User';
import Patient from '../models/patients';

const testPatientCreation = async () => {
  try {
    console.log('🔍 Testing patient creation with userId...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Sync database
    await sequelize.sync({ force: false });
    console.log('✅ Database synced');
    
    // Create a test user first
    const testUser = await User.findOrCreate({
      where: { email: 'test.doctor@example.com' },
      defaults: {
        firstName: 'Test',
        lastName: 'Doctor',
        email: 'test.doctor@example.com'
      }
    });
    
    console.log('✅ Test user created/found:', testUser[0].id);
    
    // Create a test patient with userId
    const testPatient = await Patient.create({
      firstName: 'Test',
      lastName: 'Patient',
      email: 'test.patient@example.com',
      phone: '+34 600 000 000',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      address: 'Test Address',
      userId: testUser[0].id
    });
    
    console.log('✅ Test patient created:', {
      id: testPatient.id,
      name: `${testPatient.firstName} ${testPatient.lastName}`,
      userId: testPatient.userId
    });
    
    // Verify the relationship works
    const patientWithUser = await Patient.findByPk(testPatient.id, {
      include: [{
        model: User,
        as: 'User'
      }]
    });
    
    console.log('✅ Patient with user data:', {
      patientId: patientWithUser.id,
      patientName: `${patientWithUser.firstName} ${patientWithUser.lastName}`,
      userId: patientWithUser.userId,
      userEmail: patientWithUser.User?.email
    });
    
    console.log('🎉 All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

testPatientCreation(); 