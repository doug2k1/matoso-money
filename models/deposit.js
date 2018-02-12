module.exports = (sequelize, DataTypes) => {
  const Deposit = sequelize.define('Deposit', {
    amount: { type: DataTypes.DECIMAL(10, 5), allowNull: false },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  Deposit.associate = function(models) {
    this.belongsTo(models.Investment);
  };

  return Deposit;
};
