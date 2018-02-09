module.exports = (sequelize, DataTypes) => {
  const Withdrawal = sequelize.define('Withdrawal', {
    amount: DataTypes.DECIMAL(10, 5),
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  });

  Withdrawal.associate = function(models) {
    this.belongsTo(models.Investment);
  };

  return Withdrawal;
};
