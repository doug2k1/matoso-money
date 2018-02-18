const { GraphQLString } = require('graphql');
const { Broker, Investment, BalanceUpdate } = require('../models');

module.exports = {
  Query: {
    brokers: (_, args) => Broker.all(args),
    broker: (_, { id }) => Broker.findById(id),
    investments: (_, args) => Investment.all(args),
    investment: (_, { id }) => Investment.findById(id),
    balanceUpdates: (_, args) => BalanceUpdate.all(args)
  },
  Investment: {
    broker: obj => Broker.findOne({ where: { id: obj.BrokerId } }),
    balanceUpdates: (obj, args) =>
      BalanceUpdate.all({ where: { InvestmentId: obj.id }, ...args })
  },
  Broker: {
    investments: obj => Investment.findAll({ where: { BrokerId: obj.id } })
  },
  Date: GraphQLString
};
