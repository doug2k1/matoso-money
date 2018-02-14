module.exports = (sequelize, DataTypes) => {
  const Investment = sequelize.define('Investment', {
    name: { type: DataTypes.STRING, allowNull: false }
  });

  Investment.associate = function associate(models) {
    this.belongsTo(models.Broker);
    this.hasMany(models.Deposit);
    this.hasMany(models.BalanceUpdate);
  };

  return Investment;
};
