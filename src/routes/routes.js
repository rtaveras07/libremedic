import express from 'express';
import userRoutes from '../routes/User';
 
import PatientRoutes from '../routes/Patient';
import MedicalCenterRoutes from '../routes/MedicalCenter';
import PrescriptionRoutes from '../routes/Prescription';
import DiagnosticRoutes from '../routes/Diagnostic';

// Initialization
let router = express.Router();

// Routes
router.use('/users', userRoutes);
 
router.use('/patients', PatientRoutes);
router.use('/medical-centers', MedicalCenterRoutes);
router.use('/prescriptions', PrescriptionRoutes);
router.use('/diagnostics', DiagnosticRoutes);

export default router;