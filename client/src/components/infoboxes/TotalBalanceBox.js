// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import InfoBox from '../Infobox';

const GET_BALANCES = gql`
  {
    investments {
      balanceUpdates(limit: 1, order: [["date", "DESC"]]) {
        amount
      }
    }
  }
`;

export default class TotalBalanceBox extends React.Component<{}, {}> {
  render() {
    return (
      <Query query={GET_BALANCES}>
        {({ loading, data }) => {
          if (loading) return null;

          const balance = data.investments.reduce(
            (acc, investment) => acc + investment.balanceUpdates[0].amount,
            0
          );

          return (
            <InfoBox
              icon="usd-circle"
              text="Patrimônio"
              value={`R$ ${balance.toLocaleString()}`}
              bg="green"
            />
          );
        }}
      </Query>
    );
  }
}
