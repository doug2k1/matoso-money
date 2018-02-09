module.exports = (sequelize, DataTypes) => {
  const BalanceUpdate = sequelize.define('BalanceUpdate', {
    amount: DataTypes.DECIMAL(10, 5),
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: '2018-09-03'
    }
  });

  BalanceUpdate.associate = function(models) {
    this.belongsTo(models.Investment);
  };

  return BalanceUpdate;
};
