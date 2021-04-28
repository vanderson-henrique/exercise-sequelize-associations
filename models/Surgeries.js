// Exercício 3 - Crie o model de Surgeries.
const createSurgeries = (sequelize, DataTypes) => {
  const Surgeries = sequelize.define('Surgeries', {
    surgery_id: { primaryKey: true, type: DataTypes.INTEGER },
    specialty: DataTypes.STRING,
    doctor: DataTypes.STRING
  }, 
  {
    timestamps: false
  });
  return Surgeries;
};

module.exports = createSurgeries;
