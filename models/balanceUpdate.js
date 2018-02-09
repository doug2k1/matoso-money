module.exports = (sequelize, DataTypes) => {
  const BalanceUpdate = sequelize.define('BalanceUpdate', {
    amount: DataTypes.DECIMAL(10, 5),
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: sequelize.literal('CURRENT_DATE')
    }
  });

  BalanceUpdate.associate = function(models) {
    this.belongsTo(models.Investment);
  };

  return BalanceUpdate;
};
