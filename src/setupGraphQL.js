const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');
const { Broker, Investment } = require('./models');
const authMiddleware = require('./middleware/authMiddleware');

const setup = app => {
  // types
  const typeDefs = `
    type Query { 
      brokers: [Broker]
      broker(id: ID!): Broker
      investments: [Investment]
      investment(id: ID!): Investment
    }
    type Broker { 
      id: ID!
      name: String! 
      investments: [Investment]
    }
    type Investment {
      id: ID! 
      name: String! 
      broker: Broker 
    }
  `;

  // resolvers
  const resolvers = {
    Query: {
      brokers: () => Broker.all(),
      broker: (root, { id }) => Broker.findById(id),
      investments: () => Investment.all(),
      investment: (root, { id }) => Investment.findById(id)
    },
    Investment: {
      broker: obj => Broker.findOne({ where: { id: obj.BrokerId } })
    },
    Broker: {
      investments: obj => Investment.findAll({ where: { BrokerId: obj.id } })
    }
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  // graphql endpoint
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphql', authMiddleware());

  // graphiql endpoint
  app.use(
    '/graphiql',
    authMiddleware(),
    graphiqlExpress({ endpointURL: '/graphql' })
  );
  app.use('/graphiql', authMiddleware());
};

module.exports = setup;
