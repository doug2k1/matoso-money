const { GraphQLString } = require('graphql');
// const DataLoader = require('dataloader');
const { Broker, Investment, BalanceUpdate } = require('../models');

/*
 TODO: reduce queries
  const balanceByInvestmentIdLoader = new DataLoader(ids =>
    BalanceUpdate.all({ where: { InvestmentId: ids } })
  );
 */

module.exports = {
  Query: {
    user: (obj, args, context) => context.user,
    brokers: (obj, args) => Broker.all(args),
    broker: (obj, { id }) => Broker.findById(id),
    investments: (obj, args) => Investment.all(args),
    investment: (obj, { id }) => Investment.findById(id),
    balanceUpdates: (obj, args) => BalanceUpdate.all(args)
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
