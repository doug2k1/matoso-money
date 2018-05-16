// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Line } from 'react-chartjs-2';
import Box from '../Box';

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

export default class EvolutionChart extends React.Component<{}, {}> {
  static buildChartData(data) {
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

    return {
      datasets: [
        {
          label: 'Patrimônio',
          data: Object.keys(balanceByDate)
            .sort()
            .map(key => ({
              t: new Date(key),
              y: balanceByDate[key].amount
            })),
          borderColor: '#00a65a',
          backgroundColor: '#00a65a'
        },
        {
          label: 'Projeção',
          data: Object.keys(projectionByDate)
            .sort()
            .map(key => ({
              t: new Date(key),
              y: projectionByDate[key].projection
            })),
          borderColor: '#00c0ef',
          backgroundColor: '#00c0ef'
        }
      ]
    };
  }

  render() {
    return (
      <Box>
        <Query query={GET_EVOLUTION}>
          {({ loading, data }) => {
            if (loading) return null;

            const chartData = EvolutionChart.buildChartData(data);

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
          }}
        </Query>
      </Box>
    );
  }
}
