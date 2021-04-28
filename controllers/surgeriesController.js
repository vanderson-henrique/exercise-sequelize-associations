const { Patients, Surgeries } = require('../models');

const getSurgeriesByDoctor = async (req, res) => {
  try {
    const { doctor } = req.query;
    const result = await Surgeries.findAll({
      where: { doctor },
      include: [
        { model: Patients,
          as: 'patients',
          through: { attributes: [] } 
        }]
    });
    if (!result.length) {
      return res.status(404).json({ message: 'Médico não encontrado!' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = {
  getSurgeriesByDoctor,
}