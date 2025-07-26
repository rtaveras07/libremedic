import MedicalCenter from '../models/medical_center.js';

class MedicalCenterService {
  static async create(newMedicalCenter) {
    try {
      const medicalCenter = await MedicalCenter.create(newMedicalCenter);
      return medicalCenter;
    } catch (error) {
      throw error;
    }
  }

  static async getAll({ criterions = {} } = {}) {
    try {
      const { where, limit, offset, order } = criterions;
      const result = await MedicalCenter.findAndCountAll({
        where,
        limit,
        offset,
        order,
        include: [
          {
            model: require('../models/User').default,
            as: 'User',
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
      const medicalCenter = await MedicalCenter.findByPk(id, {
        include: [
          {
            model: require('../models/User').default,
            as: 'User',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });
      return medicalCenter;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, medicalCenterData) {
    try {
      const medicalCenter = await MedicalCenter.findByPk(id);
      if (!medicalCenter) {
        return null;
      }
      await medicalCenter.update(medicalCenterData);
      return medicalCenter;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const medicalCenter = await MedicalCenter.findByPk(id);
      if (!medicalCenter) {
        return null;
      }
      await medicalCenter.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getByUserId(userId) {
    try {
      const medicalCenters = await MedicalCenter.findAll({
        where: { userId },
        include: [
          {
            model: require('../models/User').default,
            as: 'User',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      return medicalCenters;
    } catch (error) {
      throw error;
    }
  }
}

export default MedicalCenterService; 