import Diagnostic from '../../models/diagnostics';

const diagnosticSeeds = [
  {
    diagnosis: 'Hipertensión arterial',
    symptoms: 'Dolor de cabeza, mareos, visión borrosa',
    treatment: 'Cambios en el estilo de vida, medicación antihipertensiva',
    notes: 'Paciente con antecedentes familiares de hipertensión. Controlar presión arterial semanalmente',
    diagnosisDate: '2024-01-15',
    followUpDate: '2024-02-15',
    status: 'active',
    severity: 'medium',
    patientId: 1,
    doctorId: 1
  },
  {
    diagnosis: 'Asma bronquial',
    symptoms: 'Tos seca, dificultad para respirar, sibilancias',
    treatment: 'Inhalador de rescate, evitar alérgenos',
    notes: 'Síntomas empeoran con el ejercicio y cambios de temperatura',
    diagnosisDate: '2024-01-20',
    followUpDate: '2024-02-20',
    status: 'active',
    severity: 'low',
    patientId: 2,
    doctorId: 2
  },
  {
    diagnosis: 'Artritis reumatoide',
    symptoms: 'Dolor articular, rigidez matutina, inflamación',
    treatment: 'Medicación antiinflamatoria, fisioterapia',
    notes: 'Afecta principalmente manos y rodillas. Evaluar progresión',
    diagnosisDate: '2024-01-18',
    followUpDate: '2024-03-18',
    status: 'active',
    severity: 'high',
    patientId: 3,
    doctorId: 3
  },
  {
    diagnosis: 'Diabetes tipo 2',
    symptoms: 'Sed excesiva, micción frecuente, fatiga',
    treatment: 'Dieta controlada, ejercicio, medicación oral',
    notes: 'Nuevo diagnóstico. Educar sobre autocontrol de glucemia',
    diagnosisDate: '2024-01-10',
    followUpDate: '2024-02-10',
    status: 'active',
    severity: 'high',
    patientId: 1,
    doctorId: 1
  },
  {
    diagnosis: 'Gastritis crónica',
    symptoms: 'Dolor abdominal, náuseas, pérdida de apetito',
    treatment: 'Protector gástrico, dieta blanda',
    notes: 'Relacionado con estrés y hábitos alimentarios',
    diagnosisDate: '2024-01-25',
    followUpDate: '2024-02-25',
    status: 'active',
    severity: 'medium',
    patientId: 3,
    doctorId: 3
  },
  {
    diagnosis: 'Migraña crónica',
    symptoms: 'Dolor de cabeza intenso, náuseas, sensibilidad a la luz',
    treatment: 'Medicación preventiva, evitar desencadenantes',
    notes: 'Episodios frecuentes. Evaluar necesidad de tratamiento preventivo',
    diagnosisDate: '2024-01-12',
    followUpDate: '2024-02-12',
    status: 'active',
    severity: 'medium',
    patientId: 6,
    doctorId: 4
  },
  {
    diagnosis: 'Hipercolesterolemia',
    symptoms: 'Asintomático',
    treatment: 'Dieta baja en grasas, ejercicio, estatinas',
    notes: 'Detección en análisis rutinario. Control cada 3 meses',
    diagnosisDate: '2024-01-08',
    followUpDate: '2024-04-08',
    status: 'active',
    severity: 'low',
    patientId: 7,
    doctorId: 7
  },
  {
    diagnosis: 'Depresión mayor',
    symptoms: 'Tristeza persistente, pérdida de interés, cambios en el sueño',
    treatment: 'Antidepresivos, terapia psicológica',
    notes: 'Primer episodio. Seguimiento psiquiátrico recomendado',
    diagnosisDate: '2024-01-22',
    followUpDate: '2024-02-22',
    status: 'active',
    severity: 'high',
    patientId: 8,
    doctorId: 6
  },
  {
    diagnosis: 'Infección respiratoria aguda',
    symptoms: 'Fiebre, tos, congestión nasal',
    treatment: 'Antibióticos, reposo, hidratación',
    notes: 'Cultivo positivo para Streptococcus pneumoniae',
    diagnosisDate: '2024-01-16',
    followUpDate: '2024-01-23',
    status: 'resolved',
    severity: 'medium',
    patientId: 4,
    doctorId: 4
  },
  {
    diagnosis: 'Osteoporosis',
    symptoms: 'Dolor óseo, fracturas frecuentes',
    treatment: 'Suplementos de calcio, vitamina D, ejercicio',
    notes: 'Densidad ósea baja. Prevenir caídas',
    diagnosisDate: '2024-01-14',
    followUpDate: '2024-04-14',
    status: 'active',
    severity: 'medium',
    patientId: 4,
    doctorId: 4
  },
  {
    diagnosis: 'Alergia estacional',
    symptoms: 'Estornudos, picor nasal, lagrimeo',
    treatment: 'Antihistamínicos, evitar alérgenos',
    notes: 'Síntomas primaverales. Considerar inmunoterapia',
    diagnosisDate: '2024-01-30',
    followUpDate: '2024-03-30',
    status: 'active',
    severity: 'low',
    patientId: 5,
    doctorId: 5
  },
  {
    diagnosis: 'Insomnio crónico',
    symptoms: 'Dificultad para conciliar el sueño, despertares frecuentes',
    treatment: 'Higiene del sueño, terapia cognitivo-conductual',
    notes: 'Relacionado con estrés laboral. Evaluar ansiedad',
    diagnosisDate: '2024-01-28',
    followUpDate: '2024-02-28',
    status: 'pending',
    severity: 'medium',
    patientId: 6,
    doctorId: 6
  }
];

export const seedDiagnostics = async () => {
  try {
    for (const diagnosticData of diagnosticSeeds) {
      await Diagnostic.findOrCreate({
        where: {
          diagnosis: diagnosticData.diagnosis,
          patientId: diagnosticData.patientId,
          diagnosisDate: diagnosticData.diagnosisDate
        },
        defaults: diagnosticData
      });
    }
    console.log('✅ Diagnostics seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding diagnostics:', error);
  }
};

export default diagnosticSeeds; 