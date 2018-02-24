// @flow
import React from 'react';
import { gql } from 'apollo-client-preset';
import { Query } from 'react-apollo';
import { Line } from 'react-chartjs-2';
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

                const chartData = {
                  datasets: [
                    {
                      label: 'Patrimônio',
                      data: Object.keys(balanceByDate).map(key => ({
                        t: new Date(key),
                        y: balanceByDate[key].amount
                      })),
                      borderColor: '#00a65a',
                      backgroundColor: '#00a65a'
                    },
                    {
                      label: 'Projeção',
                      data: Object.keys(projectionByDate).map(key => ({
                        t: new Date(key),
                        y: projectionByDate[key].projection
                      })),
                      borderColor: '#00c0ef',
                      backgroundColor: '#00c0ef'
                    }
                  ]
                };

                const chartOptions = {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12
                    }
                  },
                  tooltips: {
                    mode: 'x',
                    intersect: false
                  },
                  elements: {
                    point: {
                      radius: 0,
                      hitRadius: 5
                    },
                    line: {
                      tension: 0,
                      borderWidth: 2,
                      fill: false
                    }
                  },
                  scales: {
                    xAxes: [
                      {
                        type: 'time',
                        time: {
                          format: 'DD/MM/YYYY',
                          tooltipFormat: 'DD/MM/YYYY'
                        }
                      }
                    ],
                    yAxes: [
                      {
                        ticks: {
                          callback: value => value.toLocaleString()
                        }
                      }
                    ]
                  }
                };

                return <Line data={chartData} options={chartOptions} />;
              }

              return null;
            }}
          </Query>
        </Box>
      </div>
    );
  }
}
