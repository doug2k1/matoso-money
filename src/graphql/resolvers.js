const { GraphQLString } = require('graphql');
const DataLoader = require('dataloader');
const {
  Broker,
  Investment,
  BalanceUpdate,
  Deposit,
  Withdrawal
} = require('../models');

// data loaders
const balancesByInvestmentIdLoader = new DataLoader(ids =>
  BalanceUpdate.all({ where: { InvestmentId: ids } })
);

const depositsByInvestmentIdLoader = new DataLoader(ids =>
  Deposit.all({ where: { InvestmentId: ids } })
);

const withdrawalsByInvestmentIdLoader = new DataLoader(ids =>
  Withdrawal.all({ where: { InvestmentId: ids } })
);

module.exports = {
  Query: {
    user: (obj, args, context) => context.user,
    brokers: (obj, args) => Broker.all(args),
    broker: (obj, { id }) => Broker.findById(id),
    investments: (obj, args) => Investment.all(args),
    investment: (obj, { id }) => Investment.findById(id),
    balanceUpdates: (obj, args) => BalanceUpdate.all(args),
    projections: () => require('../../data/projection.json'),
    historyBalances: () => require('../../data/history.json')
  },
  Investment: {
    broker: obj => Broker.findOne({ where: { id: obj.BrokerId } }),
    balanceUpdates: (obj, args) =>
      args
        ? BalanceUpdate.all({ where: { InvestmentId: obj.id }, ...args })
        : balancesByInvestmentIdLoader.load(obj.id),
    deposits: obj => depositsByInvestmentIdLoader.load(obj.id),
    withdrawals: obj => withdrawalsByInvestmentIdLoader.load(obj.id)
  },
  Broker: {
    investments: obj => Investment.findAll({ where: { BrokerId: obj.id } })
  },
  Date: GraphQLString
};
