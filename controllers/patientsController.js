const { Patients, Plans, Surgeries } = require('../models');

const getPatientsWithPlan = async (req, res) => {
  try {
    const result = await Patients.findAll({
      include: { model: Plans, as: 'plans' }});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getPatientsAndSurgeries = async (req, res) => {
  try {
    const result = await Patients.findAll({
      include: [{ model: Surgeries, as: 'surgeries', through: { attributes: [] } }]
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getPatientsSurgeriesWithoutDoctor = async (req, res) => {
  try {
    const result = await Patients.findAll({
      include: [
        { model: Surgeries,
          as: 'surgeries', 
          through: { attributes: [] }, 
          attributes: { exclude: ['doctor']}
        }]
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
}

const getPatientsByPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Plans.findAll({
      where: { plan_id: id },
      include: [{ model: Patients, as: 'patients' }]
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const addPatient = async (req, res) => {
  try {
    const { fullname, plan_id } = req.body;
    if (!fullname || !plan_id) {
      return res.status(404).json({ message: 'Dados incompletos' });
    }
    const patient = await Patients.create({ fullname, plan_id });
    res.status(201).json(patient); 
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado!' });
  } 
};

module.exports = {
  getPatientsWithPlan,
  getPatientsAndSurgeries,
  getPatientsByPlan,
  addPatient,
  getPatientsSurgeriesWithoutDoctor
}