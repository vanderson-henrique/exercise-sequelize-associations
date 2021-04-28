const { Router } = require('express');
const {
  getPatientsWithPlan,
  getPatientsAndSurgeries,
  getPatientsByPlan,
  addPatient,
  getPatientsSurgeriesWithoutDoctor
} = require('../controllers/patientsController');

const router = Router();

router.get('/patients', getPatientsWithPlan);
router.get('/patientsSurgeries', getPatientsAndSurgeries);
router.get('/patientsbyplan/:id', getPatientsByPlan)
router.post('/patient', addPatient);
router.get('/patientssurgerieswithoutdoctor', getPatientsSurgeriesWithoutDoctor);

module.exports = router;
