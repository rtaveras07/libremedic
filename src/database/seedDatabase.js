import { sequelize } from './database';
import runAllSeeds from './seeds';

// Import all models to ensure relationships are established
import './models';

const syncDatabase = async () => {
  const forceSync = process.env.FORCE_SYNC === 'true';
  console.log(`🔄 Syncing database (force: ${forceSync})...`);
  
  try {
    // First, try to sync without force to create missing tables
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.log('⚠️ First sync attempt failed, trying with force sync...');
    
    // If that fails, try with force sync
    if (forceSync) {
      await sequelize.sync({ force: true });
      console.log('✅ Database force synchronized successfully.');
    } else {
      throw error;
    }
  }
};

const seedDatabase = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync database with proper error handling
    await syncDatabase();
    
    // Run all seeds
    await runAllSeeds();
    
    console.log('🎉 Database seeding completed!');
    
    // Only exit if this file is run directly
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    if (require.main === module) {
      process.exit(1);
    } else {
      throw error; // Re-throw error when called from main app
    }
  }
};

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase; 