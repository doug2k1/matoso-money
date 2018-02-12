module.exports = (sequelize, DataTypes) => {
  const BalanceUpdate = sequelize.define('BalanceUpdate', {
    amount: { type: DataTypes.DECIMAL(10, 5), allowNull: false },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  BalanceUpdate.associate = function(models) {
    this.belongsTo(models.Investment);
  };

  return BalanceUpdate;
};
