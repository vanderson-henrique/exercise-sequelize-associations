const { Patients, Plans, Surgeries } = require('../models');

// #5 Crie um endpoint que liste todos os pacientes e seus respectivos planos.
const getPatientsWithPlan = async (req, res) => {
  try {
    const result = await Patients.findAll({
      include: { model: Plans, as: 'plans' }});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

// #6 Crie um endpoint que liste todos os pacientes e suas respectivas cirurgias realizadas.
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

// #B2 Crie um endpoint que liste todos os pacientes e suas cirurgias realizadas, mas oculte o nome do médico responsável.
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

// #7 Crie um endpoint que de acordo com o id de um plano, que deve ser recebido via requisição, liste os pacientes que o possuem.
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

// #B1 - Crie um endpoint capaz de adicionar um novo paciente.
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