import MedicalCenter from '../../models/medical_center';

const medicalCenterSeeds = [
  {
    name: 'Centro Médico Madrid Central',
    address: 'Calle Gran Vía 123, 28013 Madrid',
    phone: '+34 91 123 45 67',
    email: 'info@madridcentral.com',
    website: 'https://www.madridcentral.com',
    description: 'Centro médico especializado en medicina general y cardiología',
    image_url: 'https://example.com/images/madrid-central.jpg',
    userId: 1
  },
  {
    name: 'Clínica Barcelona Salud',
    address: 'Avenida Diagonal 456, 08013 Barcelona',
    phone: '+34 93 234 56 78',
    email: 'contacto@barcelonasalud.com',
    website: 'https://www.barcelonasalud.com',
    description: 'Clínica moderna con especialidades en pediatría y ginecología',
    image_url: 'https://example.com/images/barcelona-salud.jpg',
    userId: 2
  },
  {
    name: 'Hospital Valencia Médico',
    address: 'Plaza del Ayuntamiento 789, 46002 Valencia',
    phone: '+34 96 345 67 89',
    email: 'info@valenciamedico.com',
    website: 'https://www.valenciamedico.com',
    description: 'Hospital especializado en traumatología y rehabilitación',
    image_url: 'https://example.com/images/valencia-medico.jpg',
    userId: 3
  },
  {
    name: 'Centro de Salud Sevilla',
    address: 'Calle Sierpes 321, 41004 Sevilla',
    phone: '+34 95 456 78 90',
    email: 'salud@sevilla.com',
    website: 'https://www.sevillasalud.com',
    description: 'Centro de atención primaria con servicios de urgencias',
    image_url: 'https://example.com/images/sevilla-salud.jpg',
    userId: 4
  },
  {
    name: 'Clínica Bilbao Especializada',
    address: 'Gran Vía 654, 48001 Bilbao',
    phone: '+34 94 567 89 01',
    email: 'especializada@bilbao.com',
    website: 'https://www.bilbaoespecializada.com',
    description: 'Clínica especializada en neurología y psiquiatría',
    image_url: 'https://example.com/images/bilbao-especializada.jpg',
    userId: 5
  },
  {
    name: 'Centro Médico Málaga Costa',
    address: 'Paseo Marítimo 987, 29016 Málaga',
    phone: '+34 95 678 90 12',
    email: 'costa@malaga.com',
    website: 'https://www.malagacosta.com',
    description: 'Centro médico con vistas al mar, especializado en medicina deportiva',
    image_url: 'https://example.com/images/malaga-costa.jpg',
    userId: 6
  },
  {
    name: 'Hospital Alicante General',
    address: 'Avenida de Denia 147, 03015 Alicante',
    phone: '+34 96 789 01 23',
    email: 'general@alicante.com',
    website: 'https://www.alicantegeneral.com',
    description: 'Hospital general con todas las especialidades médicas',
    image_url: 'https://example.com/images/alicante-general.jpg',
    userId: 7
  },
  {
    name: 'Clínica Granada Alhambra',
    address: 'Calle Real de la Alhambra 258, 18009 Granada',
    phone: '+34 95 890 12 34',
    email: 'alhambra@granada.com',
    website: 'https://www.granadaalhambra.com',
    description: 'Clínica especializada en medicina estética y cirugía plástica',
    image_url: 'https://example.com/images/granada-alhambra.jpg',
    userId: 8
  }
];

export const seedMedicalCenters = async () => {
  try {
    for (const medicalCenterData of medicalCenterSeeds) {
      await MedicalCenter.findOrCreate({
        where: { email: medicalCenterData.email },
        defaults: medicalCenterData
      });
    }
    console.log('✅ Medical Centers seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding medical centers:', error);
  }
};

export default medicalCenterSeeds; 