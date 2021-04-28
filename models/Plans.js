// Exercício 1 - Crie o model de Plans. (1:N)
const createPlans = (sequelize, DataTypes) => {
  const Plans = sequelize.define('Plans', {
    plan_id: { type: DataTypes.INTEGER, primaryKey: true },
    coverage: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    timestamps: false,
  });

  Plans.associate = (models) => {
    Plans.hasMany(models.Patients,
      { foreignKey: 'plan_id', as: 'patients' });
  };
  return Plans;
};

module.exports = createPlans;
