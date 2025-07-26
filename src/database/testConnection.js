import { sequelize } from './database';
import './models';

const testConnection = async () => {
  try {
    console.log('🔍 Testing database connection and models...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Test model loading
    console.log('✅ Models loaded successfully');
    
    // Test sync without force
    console.log('🔄 Testing database sync...');
    await sequelize.sync({ force: false });
    console.log('✅ Database sync successful');
    
    console.log('🎉 All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
};

testConnection(); 