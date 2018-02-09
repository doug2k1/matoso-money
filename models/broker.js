module.exports = (sequelize, DataTypes) => {
  const Broker = sequelize.define('Broker', {
    name: DataTypes.STRING
  });

  Broker.associate = function(models) {
    this.hasMany(models.Investment);
  };

  return Broker;
};
