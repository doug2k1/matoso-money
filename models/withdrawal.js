module.exports = (sequelize, DataTypes) => {
  const Withdrawal = sequelize.define('Withdrawal', {
    amount: { type: DataTypes.DECIMAL(10, 5), allowNull: false },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  Withdrawal.associate = function(models) {
    this.belongsTo(models.Investment);
  };

  return Withdrawal;
};
