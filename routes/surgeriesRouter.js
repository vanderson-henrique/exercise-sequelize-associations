const { Router } = require('express');
const { getSurgeriesByDoctor } = require('../controllers/surgeriesController');

const router = Router();

router.get('/surgeries', getSurgeriesByDoctor);

module.exports = router;