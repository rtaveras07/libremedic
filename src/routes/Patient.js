import { Router } from 'express';
import PatientsController from '../controllers/PatientsController';

const router = Router();

router.get('/', PatientsController.getAll);
router.get('/:id', PatientsController.getById);
router.put('/:id', PatientsController.update);
router.post('/', PatientsController.create);
router.delete('/:id', PatientsController.delete);

export default router;
