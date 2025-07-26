import { seedUsers } from './UserSeeds';
import { seedPatients } from './PatientSeeds';
import { seedMedicalCenters } from './MedicalCenterSeeds';
import { seedPrescriptions } from './PrescriptionSeeds';
import { seedDiagnostics } from './DiagnosticSeeds';

export const runAllSeeds = async () => {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Seed in order to respect foreign key constraints
    await seedUsers();
    await seedPatients();
    await seedMedicalCenters();
    await seedPrescriptions();
    await seedDiagnostics();
    
    console.log('✅ All seeds completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
};

export default runAllSeeds; 