module.exports = (sequelize, DataTypes) => {
  const Deposit = sequelize.define('Deposit', {
    amount: DataTypes.DECIMAL(10, 5),
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  });

  Deposit.associate = function(models) {
    this.belongsTo(models.Investment);
  };

  return Deposit;
};
