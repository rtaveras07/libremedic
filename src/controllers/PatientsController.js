import PatientService from '../services/PatientsService';
import Response from '../utils/response';
import querystringConverterHelper from '../utils/querystringConverterHelper';

class PatientsController {
  static async create(req, res) {
    const newPatient = req.body;
    try {
      const patient = await PatientService.create(newPatient);
      return res.json(Response.get('Patient Created', patient));
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
      const { rows, count, total } = await PatientService.getAll({
        criterions: {
          where,
          limit,
          offset,
          order,
        }
      });

      return res.json(Response.get('Patients list', rows, 200, { count, total, offset }));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getById(req, res) {
    try {
      const patient = await PatientService.getById(req.params.id);

      if (patient) {
        return res.json(Response.get('Patient found', patient));
      }
      return res.json(Response.get('Patient not found', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const patient = req.body;

    try {
      const updatePatient = await PatientService.update(id, patient);

      return res.json(Response.get('Patient Updated', updatePatient));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async delete(req, res) {
    try {
      await PatientService.delete(req.params.id);
      return res.json(Response.get('Patient deleted', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }
}

export default PatientsController;
