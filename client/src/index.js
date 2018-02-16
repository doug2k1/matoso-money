import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, graphql } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import gql from 'graphql-tag';
import App from './components/App';

const httpLink = new HttpLink({ uri: '/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class Broker extends React.Component<any, any> {
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
        {brokerQuery.brokers.map(broker => (
          <p key={broker.id}>{broker.name}</p>
        ))}
      </div>
    );
  }
}

const BrokerQL = graphql(
  gql(
    `query brokerQuery { 
      brokers {
        id
        name
      }  
    }`
  ),
  { name: 'brokerQuery' }
)(Broker);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
        <a href="/auth/logout">Logout</a>
        <BrokerQL />
        <App />
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
