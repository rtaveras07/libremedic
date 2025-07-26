import Diagnostic from '../models/diagnostics.js';

class DiagnosticService {
  static async create(newDiagnostic) {
    try {
      const diagnostic = await Diagnostic.create(newDiagnostic);
      return diagnostic;
    } catch (error) {
      throw error;
    }
  }

  static async getAll({ criterions = {} } = {}) {
    try {
      const { where, limit, offset, order } = criterions;
      const result = await Diagnostic.findAndCountAll({
        where,
        limit,
        offset,
        order,
        include: [
          {
            model: require('../models/User').default,
            as: 'Doctor',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/patients').default,
            as: 'Patient',
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
      const diagnostic = await Diagnostic.findByPk(id, {
        include: [
          {
            model: require('../models/User').default,
            as: 'Doctor',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/patients').default,
            as: 'Patient',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });
      return diagnostic;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, diagnosticData) {
    try {
      const diagnostic = await Diagnostic.findByPk(id);
      if (!diagnostic) {
        return null;
      }
      await diagnostic.update(diagnosticData);
      return diagnostic;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const diagnostic = await Diagnostic.findByPk(id);
      if (!diagnostic) {
        return null;
      }
      await diagnostic.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getByPatientId(patientId) {
    try {
      const diagnostics = await Diagnostic.findAll({
        where: { patientId },
        include: [
          {
            model: require('../models/User').default,
            as: 'Doctor',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/patients').default,
            as: 'Patient',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ],
        order: [['diagnosisDate', 'DESC']]
      });
      return diagnostics;
    } catch (error) {
      throw error;
    }
  }

  static async getByDoctorId(doctorId) {
    try {
      const diagnostics = await Diagnostic.findAll({
        where: { doctorId },
        include: [
          {
            model: require('../models/User').default,
            as: 'Doctor',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/patients').default,
            as: 'Patient',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ],
        order: [['diagnosisDate', 'DESC']]
      });
      return diagnostics;
    } catch (error) {
      throw error;
    }
  }

  static async getByStatus(status) {
    try {
      const diagnostics = await Diagnostic.findAll({
        where: { status },
        include: [
          {
            model: require('../models/User').default,
            as: 'Doctor',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/patients').default,
            as: 'Patient',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ],
        order: [['diagnosisDate', 'DESC']]
      });
      return diagnostics;
    } catch (error) {
      throw error;
    }
  }
}

export default DiagnosticService; 