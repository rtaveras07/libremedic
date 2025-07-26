import Patient from '../../models/patients';

const patientSeeds = [
  {
    userId: 1,
    firstName: 'Juan Carlos',
    lastName: 'Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 600 123 456',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    address: 'Calle Mayor 123, Madrid',
    emergencyContact: 'María Pérez',
    emergencyPhone: '+34 600 654 321',
    bloodType: 'O+',
    allergies: 'Penicilina',
    medicalHistory: 'Hipertensión, diabetes tipo 2'
  },
  {
    userId: 1,
    firstName: 'Ana Sofía',
    lastName: 'García',
    email: 'ana.garcia@email.com',
    phone: '+34 600 234 567',
    dateOfBirth: '1992-07-22',
    gender: 'female',
    address: 'Avenida de la Paz 45, Barcelona',
    emergencyContact: 'Carlos García',
    emergencyPhone: '+34 600 765 432',
    bloodType: 'A+',
    allergies: 'Ninguna',
    medicalHistory: 'Asma leve'
  },
  {
    userId: 1,
    firstName: 'Miguel Ángel',
    lastName: 'López',
    email: 'miguel.lopez@email.com',
    phone: '+34 600 345 678',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    address: 'Plaza España 7, Valencia',
    emergencyContact: 'Elena López',
    emergencyPhone: '+34 600 876 543',
    bloodType: 'B-',
    allergies: 'Polen, ácaros',
    medicalHistory: 'Artritis reumatoide'
  },
  {
    userId: 1,
    firstName: 'Carmen Elena',
    lastName: 'Martínez',
    email: 'carmen.martinez@email.com',
    phone: '+34 600 456 789',
    dateOfBirth: '1965-12-03',
    gender: 'female',
    address: 'Calle Real 89, Sevilla',
    emergencyContact: 'Antonio Martínez',
    emergencyPhone: '+34 600 987 654',
    bloodType: 'AB+',
    allergies: 'Mariscos',
    medicalHistory: 'Hipertensión, osteoporosis'
  },
  {
    userId: 1,
    firstName: 'Roberto José',
    lastName: 'Fernández',
    email: 'roberto.fernandez@email.com',
    phone: '+34 600 567 890',
    dateOfBirth: '1990-05-18',
    gender: 'male',
    address: 'Gran Vía 234, Bilbao',
    emergencyContact: 'Isabel Fernández',
    emergencyPhone: '+34 600 098 765',
    bloodType: 'O-',
    allergies: 'Látex',
    medicalHistory: 'Ninguna'
  },
  {
    userId: 1,
    firstName: 'Patricia Isabel',
    lastName: 'González',
    email: 'patricia.gonzalez@email.com',
    phone: '+34 600 678 901',
    dateOfBirth: '1988-09-25',
    gender: 'female',
    address: 'Calle Nueva 56, Málaga',
    emergencyContact: 'Francisco González',
    emergencyPhone: '+34 600 109 876',
    bloodType: 'A-',
    allergies: 'Polvo',
    medicalHistory: 'Migrañas crónicas'
  },
  {
    userId: 1,
    firstName: 'Luis Alberto',
    lastName: 'Rodríguez',
    email: 'luis.rodriguez@email.com',
    phone: '+34 600 789 012',
    dateOfBirth: '1975-01-30',
    gender: 'male',
    address: 'Paseo Marítimo 12, Alicante',
    emergencyContact: 'Rosa Rodríguez',
    emergencyPhone: '+34 600 210 987',
    bloodType: 'B+',
    allergies: 'Ninguna',
    medicalHistory: 'Colesterol alto'
  },
  {
    userId: 1,
    firstName: 'Elena María',
    lastName: 'Moreno',
    email: 'elena.moreno@email.com',
    phone: '+34 600 890 123',
    dateOfBirth: '1983-04-12',
    gender: 'female',
    address: 'Calle del Sol 78, Granada',
    emergencyContact: 'Pedro Moreno',
    emergencyPhone: '+34 600 321 098',
    bloodType: 'O+',
    allergies: 'Polen, gramíneas',
    medicalHistory: 'Depresión, ansiedad'
  }
];

export const seedPatients = async () => {
  try {
    for (const patientData of patientSeeds) {
      await Patient.findOrCreate({
        where: { email: patientData.email },
        defaults: patientData
      });
    }
    console.log('✅ Patients seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding patients:', error);
  }
};

export default patientSeeds; 