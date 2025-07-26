import Prescription from '../../models/prescriptions';

const prescriptionSeeds = [
  {
    medication: 'Paracetamol 500mg',
    dosage: '1 comprimido',
    frequency: 'Cada 6-8 horas',
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    instructions: 'Tomar con las comidas. No exceder 4 comprimidos al día',
    patientId: 1,
    prescribedBy: 1
  },
  {
    medication: 'Ibuprofeno 400mg',
    dosage: '1 comprimido',
    frequency: 'Cada 8 horas',
    startDate: '2024-01-20',
    endDate: '2024-01-27',
    instructions: 'Tomar con el estómago lleno',
    patientId: 2,
    prescribedBy: 2
  },
  {
    medication: 'Omeprazol 20mg',
    dosage: '1 cápsula',
    frequency: 'Una vez al día',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    instructions: 'Tomar en ayunas, 30 minutos antes del desayuno',
    patientId: 3,
    prescribedBy: 3
  },
  {
    medication: 'Amoxicilina 500mg',
    dosage: '1 cápsula',
    frequency: 'Cada 8 horas',
    startDate: '2024-01-18',
    endDate: '2024-01-25',
    instructions: 'Completar todo el tratamiento. Tomar con agua',
    patientId: 4,
    prescribedBy: 4
  },
  {
    medication: 'Loratadina 10mg',
    dosage: '1 comprimido',
    frequency: 'Una vez al día',
    startDate: '2024-01-12',
    endDate: '2024-02-12',
    instructions: 'Tomar por la mañana. No produce somnolencia',
    patientId: 5,
    prescribedBy: 5
  },
  {
    medication: 'Metformina 850mg',
    dosage: '1 comprimido',
    frequency: 'Dos veces al día',
    startDate: '2024-01-05',
    endDate: null,
    instructions: 'Tomar con las comidas principales. Controlar glucemia regularmente',
    patientId: 1,
    prescribedBy: 1
  },
  {
    medication: 'Enalapril 10mg',
    dosage: '1 comprimido',
    frequency: 'Una vez al día',
    startDate: '2024-01-08',
    endDate: null,
    instructions: 'Tomar por la mañana. Controlar presión arterial',
    patientId: 1,
    prescribedBy: 1
  },
  {
    medication: 'Salbutamol inhalador',
    dosage: '2 inhalaciones',
    frequency: 'Cada 4-6 horas según necesidad',
    startDate: '2024-01-14',
    endDate: null,
    instructions: 'Usar solo cuando sea necesario. Agitar antes de usar',
    patientId: 2,
    prescribedBy: 2
  },
  {
    medication: 'Diclofenaco 50mg',
    dosage: '1 comprimido',
    frequency: 'Tres veces al día',
    startDate: '2024-01-16',
    endDate: '2024-01-23',
    instructions: 'Tomar con las comidas para evitar irritación gástrica',
    patientId: 3,
    prescribedBy: 3
  },
  {
    medication: 'Calcio + Vitamina D',
    dosage: '1 comprimido',
    frequency: 'Una vez al día',
    startDate: '2024-01-10',
    endDate: null,
    instructions: 'Tomar con las comidas. Exponerse al sol moderadamente',
    patientId: 4,
    prescribedBy: 4
  },
  {
    medication: 'Sertralina 50mg',
    dosage: '1 comprimido',
    frequency: 'Una vez al día',
    startDate: '2024-01-20',
    endDate: null,
    instructions: 'Tomar por la mañana. Efectos pueden tardar 2-4 semanas',
    patientId: 8,
    prescribedBy: 6
  },
  {
    medication: 'Simvastatina 20mg',
    dosage: '1 comprimido',
    frequency: 'Una vez al día',
    startDate: '2024-01-15',
    endDate: null,
    instructions: 'Tomar por la noche. Controlar función hepática',
    patientId: 7,
    prescribedBy: 7
  }
];

export const seedPrescriptions = async () => {
  try {
    for (const prescriptionData of prescriptionSeeds) {
      await Prescription.findOrCreate({
        where: {
          medication: prescriptionData.medication,
          patientId: prescriptionData.patientId,
          startDate: prescriptionData.startDate
        },
        defaults: prescriptionData
      });
    }
    console.log('✅ Prescriptions seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding prescriptions:', error);
  }
};

export default prescriptionSeeds; 