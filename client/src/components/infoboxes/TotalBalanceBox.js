// @flow
import React from 'react';
import { gql } from 'apollo-client-preset';
import { Query } from 'react-apollo';
import InfoBox from '../Infobox';

const GET_BALANCES = gql`
  {
    investments {
      name
      balanceUpdates(limit: 1, order: [["date", "DESC"]]) {
        amount
        date
      }
    }
  }
`;

export default class TotalBalanceBox extends React.Component<{}, {}> {
  render() {
    return (
      <Query query={GET_BALANCES}>
        {({ data }) => {
          const balance = data
            ? data.investments.reduce(
                (acc, investment) => acc + investment.balanceUpdates[0].amount,
                0
              )
            : '...';

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
