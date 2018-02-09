module.exports = (sequelize, DataTypes) => {
  const Broker = sequelize.define('Deposit', {
    amount: DataTypes.DECIMAL(10,5),
    date: DataTypes.DATEONLY
  });

  Broker.associate = function(models) {
    this.belongsTo(models.Investment);
  };

  return Broker;
};
