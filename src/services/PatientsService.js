import Patient from '../models/patients.js';
class PatientService {
  static async create(newPatient) {
    try {
      const patient = await Patient.create(newPatient);
      return patient;
    } catch (error) {
      throw error;
    }
  }

  static async getAll({ criterions = {} } = {}) {
    try {
      const { where, limit, offset, order } = criterions;
      const result = await Patient.findAndCountAll({
        where,
        limit,
        offset,
        order,
      });
      return {
        rows: result.rows,
        count: result.count,
        total: result.count, // for compatibility
      };
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const patient = await Patient.findByPk(id);
      return patient;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, patientData) {
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return null;
      }
      await patient.update(patientData);
      return patient;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return null;
      }
      await patient.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default PatientService;
