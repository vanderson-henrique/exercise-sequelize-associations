const createPatients = (sequelize, DataTypes) => {
  const Patients = sequelize.define('Patients', {
    patient_id: { primaryKey: true, type: DataTypes.INTEGER },
    fullname: DataTypes.STRING,
    plan_id: { type: DataTypes.INTEGER, foreignKey: true }
  },
  {
    timestamps: false
  });

  Patients.associate = (models) => {
    Patients.belongsTo(models.Plans,
      { foreignKey: 'plan_id', as: 'plans' });
  };
  return Patients;
};

module.exports = createPatients;
