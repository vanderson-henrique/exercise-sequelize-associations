const { Patients, Surgeries } = require('../models');

/* #B3 Crie um endpoint que de acordo com o nome do médico, que deve ser recebido 
via requisição, liste todas as cirurgias realizadas pelo mesmo, um get na 
url http://localhost:3000/surgeries/Rey%20Dos%20Santosdeve retornar as cirurgias 
realizadas pelo médico Rey Dos Santos. */

// Neste caso eu recebi o parametro como queryString
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