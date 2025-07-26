import MedicalCenterService from '../services/MedicalCenterService';
import Response from '../utils/response';
import querystringConverterHelper from '../utils/querystringConverterHelper';

class MedicalCenterController {
  static async create(req, res) {
    const newMedicalCenter = req.body;
    try {
      const medicalCenter = await MedicalCenterService.create(newMedicalCenter);
      return res.json(Response.get('Medical Center Created', medicalCenter));
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
      const { rows, count, total } = await MedicalCenterService.getAll({
        criterions: {
          where,
          limit,
          offset,
          order,
        }
      });

      return res.json(Response.get('Medical Centers list', rows, 200, { count, total, offset }));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getById(req, res) {
    try {
      const medicalCenter = await MedicalCenterService.getById(req.params.id);

      if (medicalCenter) {
        return res.json(Response.get('Medical Center found', medicalCenter));
      }
      return res.json(Response.get('Medical Center not found', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const medicalCenter = req.body;

    try {
      const updateMedicalCenter = await MedicalCenterService.update(id, medicalCenter);

      return res.json(Response.get('Medical Center Updated', updateMedicalCenter));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async delete(req, res) {
    try {
      await MedicalCenterService.delete(req.params.id);
      return res.json(Response.get('Medical Center deleted', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async getByUserId(req, res) {
    try {
      const { userId } = req.params;
      const medicalCenters = await MedicalCenterService.getByUserId(userId);
      return res.json(Response.get('User medical centers found', medicalCenters));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }
}

export default MedicalCenterController; 