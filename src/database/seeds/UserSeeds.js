import User from '../../models/User';

const userSeeds = [
  {
    firstName: 'Dr. María',
    lastName: 'González',
    email: 'maria.gonzalez@libremedic.com'
  },
  {
    firstName: 'Dr. Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.rodriguez@libremedic.com'
  },
  {
    firstName: 'Dr. Ana',
    lastName: 'Martínez',
    email: 'ana.martinez@libremedic.com'
  },
  {
    firstName: 'Dr. Luis',
    lastName: 'Hernández',
    email: 'luis.hernandez@libremedic.com'
  },
  {
    firstName: 'Dr. Patricia',
    lastName: 'López',
    email: 'patricia.lopez@libremedic.com'
  },
  {
    firstName: 'Dr. Roberto',
    lastName: 'García',
    email: 'roberto.garcia@libremedic.com'
  },
  {
    firstName: 'Dr. Carmen',
    lastName: 'Fernández',
    email: 'carmen.fernandez@libremedic.com'
  },
  {
    firstName: 'Dr. Javier',
    lastName: 'Moreno',
    email: 'javier.moreno@libremedic.com'
  }
];

export const seedUsers = async () => {
  try {
    for (const userData of userSeeds) {
      await User.findOrCreate({
        where: { email: userData.email },
        defaults: userData
      });
    }
    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
};

export default userSeeds; 