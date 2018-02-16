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
    }
    type Broker { 
      id: ID!
      name: String! 
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
      investments: () => Investment.all()
    }
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  // graphql endpoint
  app.use(
    '/graphql',
    authMiddleware(),
    bodyParser.json(),
    graphqlExpress({ schema })
  );

  // graphiql endpoint
  app.use(
    '/graphiql',
    authMiddleware(),
    graphiqlExpress({ endpointURL: '/graphql' })
  );
};

module.exports = setup;
