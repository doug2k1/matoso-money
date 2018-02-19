const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');
const resolvers = require('./graphql/resolvers');

const setup = app => {
  const schema = makeExecutableSchema({
    typeDefs: importSchema('src/graphql/schema.graphql'),
    resolvers
  });

  // graphql endpoint
  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => ({ schema, context: { user: req.user } }))
  );
  app.use('/graphql', authMiddleware);

  // graphiql endpoint
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.use('/graphiql', authMiddleware);
};

module.exports = setup;
