import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import App from './components/App';

const httpLink = new HttpLink({ uri: '/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
        <a href="/auth/logout">Logout</a>
        <App />
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
