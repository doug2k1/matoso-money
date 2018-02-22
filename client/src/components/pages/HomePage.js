// @flow
import React from 'react';
import { gql } from 'apollo-client-preset';
import { Query } from 'react-apollo';
import InfoBox from '../Infobox';
import Box from '../Box';
import LineChart from '../charts/LineChart';

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

export default class HomePage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="grid-3">
          <Query query={GET_BALANCES}>
            {({ data }) => {
              const balance = data
                ? data.investments.reduce(
                    (acc, investment) =>
                      acc + investment.balanceUpdates[0].amount,
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

          <InfoBox icon="line-chart" text="Projeção" value="2035" bg="aqua" />
        </div>

        <Box>
          <LineChart />
        </Box>
      </div>
    );
  }
}
