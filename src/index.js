import app from './app';
import '@babel/polyfill';
import seedDatabase from './database/seedDatabase';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main(){
  try {
    // Run database seeding on startup if AUTO_SEED is enabled
    if (process.env.AUTO_SEED === 'true') {
      console.log('🌱 Initializing database with seed data...');
      await seedDatabase();
    } else {
      console.log('⏭️ Skipping automatic seeding (AUTO_SEED=false)');
    }
    
    // Start the server
    await app.listen(process.env.PORT);
    console.log(`🚀 Server running: http://localhost:${process.env.PORT} ✅`);
  } catch (error) {
    console.error('❌ Error starting application:', error);
    process.exit(1);
  }
}

main();