module.exports = (sequelize, DataTypes) => {
  const Withdrawal = sequelize.define('Withdrawal', {
    amount: { type: DataTypes.DECIMAL(16, 2), allowNull: false },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  Withdrawal.associate = function associate(models) {
    this.belongsTo(models.Investment);
  };

  return Withdrawal;
};
