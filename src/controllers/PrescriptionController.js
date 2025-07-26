import PrescriptionService from '../services/PrescriptionService';
import Response from '../utils/response';
import querystringConverterHelper from '../utils/querystringConverterHelper';

class PrescriptionController {
  static async create(req, res) {
    const newPrescription = req.body;
    try {
      const prescription = await PrescriptionService.create(newPrescription);
      return res.json(Response.get('Prescription Created', prescription));
    } catch (error) {
      res.status(500).json({
        message: 'Something goes wrong',
        data: error
      });
    }
  }

  static async getAll(req, res) {
    const { query } = req;

    let { where, limit, offset, order } = querystringConverterHelper.parseQuery(query);

    try {
      const { rows, count, total } = await PrescriptionService.getAll({
        criterions: {
          where,
          limit,
          offset,
          order,
        }
      });

      return res.json(Response.get('Prescriptions list', rows, 200, { count, total, offset }));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getById(req, res) {
    try {
      const prescription = await PrescriptionService.getById(req.params.id);

      if (prescription) {
        return res.json(Response.get('Prescription found', prescription));
      }
      return res.json(Response.get('Prescription not found', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const prescription = req.body;

    try {
      const updatePrescription = await PrescriptionService.update(id, prescription);

      return res.json(Response.get('Prescription Updated', updatePrescription));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async delete(req, res) {
    try {
      await PrescriptionService.delete(req.params.id);
      return res.json(Response.get('Prescription deleted', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getByPatientId(req, res) {
    try {
      const { patientId } = req.params;
      const prescriptions = await PrescriptionService.getByPatientId(patientId);
      return res.json(Response.get('Patient prescriptions found', prescriptions));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }
}

export default PrescriptionController; 