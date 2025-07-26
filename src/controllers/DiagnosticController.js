import DiagnosticService from '../services/DiagnosticService';
import Response from '../utils/response';
import querystringConverterHelper from '../utils/querystringConverterHelper';

class DiagnosticController {
  static async create(req, res) {
    const newDiagnostic = req.body;
    try {
      const diagnostic = await DiagnosticService.create(newDiagnostic);
      return res.json(Response.get('Diagnostic Created', diagnostic));
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
      const { rows, count, total } = await DiagnosticService.getAll({
        criterions: {
          where,
          limit,
          offset,
          order,
        }
      });

      return res.json(Response.get('Diagnostics list', rows, 200, { count, total, offset }));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getById(req, res) {
    try {
      const diagnostic = await DiagnosticService.getById(req.params.id);

      if (diagnostic) {
        return res.json(Response.get('Diagnostic found', diagnostic));
      }
      return res.json(Response.get('Diagnostic not found', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const diagnostic = req.body;

    try {
      const updateDiagnostic = await DiagnosticService.update(id, diagnostic);

      return res.json(Response.get('Diagnostic Updated', updateDiagnostic));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async delete(req, res) {
    try {
      await DiagnosticService.delete(req.params.id);
      return res.json(Response.get('Diagnostic deleted', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getByPatientId(req, res) {
    try {
      const { patientId } = req.params;
      const diagnostics = await DiagnosticService.getByPatientId(patientId);
      return res.json(Response.get('Patient diagnostics found', diagnostics));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getByDoctorId(req, res) {
    try {
      const { doctorId } = req.params;
      const diagnostics = await DiagnosticService.getByDoctorId(doctorId);
      return res.json(Response.get('Doctor diagnostics found', diagnostics));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getByStatus(req, res) {
    try {
      const { status } = req.params;
      const diagnostics = await DiagnosticService.getByStatus(status);
      return res.json(Response.get(`Diagnostics with status ${status} found`, diagnostics));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }
}

export default DiagnosticController; 