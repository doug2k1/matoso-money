// @flow
import React from 'react';
import { gql } from 'apollo-client-preset';
import { Query } from 'react-apollo';
import { Chart } from 'react-google-charts';
import deepMerge from 'lodash/merge';
import InfoBox from '../Infobox';
import Box from '../Box';

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

const GET_EVOLUTION = gql`
  {
    balanceUpdates {
      amount
      date
    }
    projections {
      amount
      date
    }
    historyBalances {
      amount
      date
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
          <Query query={GET_EVOLUTION}>
            {({ data }) => {
              if (data) {
                const balanceByDate = {};

                // add historical data
                data.historyBalances.forEach(bal => {
                  balanceByDate[bal.date] = { amount: bal.amount };
                });

                // add recent data
                data.balanceUpdates.forEach(bal => {
                  balanceByDate[bal.date] = balanceByDate[bal.date] || {
                    amount: 0
                  };
                  balanceByDate[bal.date].amount += bal.amount;
                });

                const projectionByDate = {};

                // add projections
                data.projections.forEach(projection => {
                  projectionByDate[projection.date] = {
                    projection: projection.amount
                  };
                });

                // merge everything
                const mergedValues = deepMerge(
                  {},
                  balanceByDate,
                  projectionByDate
                );

                // build chart data
                const chartData = Object.keys(mergedValues).map(key => [
                  new Date(key),
                  mergedValues[key].amount,
                  mergedValues[key].projection
                ]);

                return (
                  <Chart
                    chartType="LineChart"
                    columns={[
                      { type: 'date', formatType: 'short' },
                      { type: 'number' },
                      { type: 'number' }
                    ]}
                    rows={chartData}
                    options={{
                      legend: 'none',
                      hAxis: {
                        format: 'dd/MM/yyyy'
                      }
                    }}
                    width="100%"
                  />
                );
              }

              return null;
            }}
          </Query>
        </Box>
      </div>
    );
  }
}
