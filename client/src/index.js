import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';

import { ApolloProvider, graphql } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const httpLink = new HttpLink({ uri: '/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class Broker extends React.Component {
  render() {
    const { brokerQuery } = this.props;

    if (brokerQuery && brokerQuery.loading) {
      return <p>Loading...</p>;
    }

    if (brokerQuery && brokerQuery.error) {
      return <p>Error...</p>;
    }

    return (
      <div>
        {brokerQuery.allBrokers.edges.map(broker => <p key={broker.node.id}>{broker.node.name}</p>)}
      </div>
    );
  }
}

const BrokerQL = graphql(
  gql(
    `query brokerQuery { allBrokers {
    edges {
      node {
        id,
        name
      }
    }
  }}`
  ),
  { name: 'brokerQuery' }
)(Broker);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <BrokerQL />
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
