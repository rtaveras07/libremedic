import Prescription from '../models/prescriptions.js';

class PrescriptionService {
  static async create(newPrescription) {
    try {
      const prescription = await Prescription.create(newPrescription);
      return prescription;
    } catch (error) {
      throw error;
    }
  }

  static async getAll({ criterions = {} } = {}) {
    try {
      const { where, limit, offset, order } = criterions;
      const result = await Prescription.findAndCountAll({
        where,
        limit,
        offset,
        order,
        include: [
          {
            model: require('../models/User').default,
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
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
      const prescription = await Prescription.findByPk(id, {
        include: [
          {
            model: require('../models/User').default,
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });
      return prescription;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, prescriptionData) {
    try {
      const prescription = await Prescription.findByPk(id);
      if (!prescription) {
        return null;
      }
      await prescription.update(prescriptionData);
      return prescription;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const prescription = await Prescription.findByPk(id);
      if (!prescription) {
        return null;
      }
      await prescription.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getByPatientId(patientId) {
    try {
      const prescriptions = await Prescription.findAll({
        where: { patientId },
        include: [
          {
            model: require('../models/User').default,
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      return prescriptions;
    } catch (error) {
      throw error;
    }
  }
}

export default PrescriptionService; 