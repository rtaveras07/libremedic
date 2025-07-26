import { sequelize } from './database';
import './models';
import User from '../models/User';
import Patient from '../models/patients';
import Diagnostic from '../models/diagnostics';

const testDiagnosticCreation = async () => {
  try {
    console.log('🔍 Testing diagnostic creation with doctorId...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Sync database
    await sequelize.sync({ force: false });
    console.log('✅ Database synced');
    
    // Get or create test user (doctor)
    const testDoctor = await User.findOrCreate({
      where: { email: 'test.doctor@example.com' },
      defaults: {
        firstName: 'Test',
        lastName: 'Doctor',
        email: 'test.doctor@example.com'
      }
    });
    
    console.log('✅ Test doctor created/found:', testDoctor[0].id);
    
    // Get or create test patient
    const testPatient = await Patient.findOrCreate({
      where: { email: 'test.patient@example.com' },
      defaults: {
        firstName: 'Test',
        lastName: 'Patient',
        email: 'test.patient@example.com',
        phone: '+34 600 000 000',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: 'Test Address',
        userId: testDoctor[0].id
      }
    });
    
    console.log('✅ Test patient created/found:', testPatient[0].id);
    
    // Create a test diagnostic with doctorId
    const testDiagnostic = await Diagnostic.create({
      diagnosis: 'Test Diagnosis',
      symptoms: 'Test symptoms',
      treatment: 'Test treatment',
      notes: 'Test notes',
      diagnosisDate: '2024-01-15',
      followUpDate: '2024-02-15',
      status: 'active',
      severity: 'medium',
      patientId: testPatient[0].id,
      doctorId: testDoctor[0].id
    });
    
    console.log('✅ Test diagnostic created:', {
      id: testDiagnostic.id,
      diagnosis: testDiagnostic.diagnosis,
      patientId: testDiagnostic.patientId,
      doctorId: testDiagnostic.doctorId
    });
    
    // Verify the relationships work
    const diagnosticWithRelations = await Diagnostic.findByPk(testDiagnostic.id, {
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
      ]
    });
    
    console.log('✅ Diagnostic with relations:', {
      diagnosticId: diagnosticWithRelations.id,
      diagnosis: diagnosticWithRelations.diagnosis,
      doctorId: diagnosticWithRelations.doctorId,
      doctorName: `${diagnosticWithRelations.Doctor?.firstName} ${diagnosticWithRelations.Doctor?.lastName}`,
      patientId: diagnosticWithRelations.patientId,
      patientName: `${diagnosticWithRelations.Patient?.firstName} ${diagnosticWithRelations.Patient?.lastName}`
    });
    
    console.log('🎉 All diagnostic tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

testDiagnosticCreation(); 