// @flow
import * as React from 'react';
import Chart from 'chart.js';

type Props = {
  data: {
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor?: string,
      borderColor?: string
    }[]
  }
};

export default class LineChart extends React.Component<{}, Props> {
  componentDidMount() {
    const { data } = this.props;

    const chart = new Chart(this.canvasEl, {
      type: 'line',
      options: {
        layout: {
          padding: 5
        },
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
            borderWidth: 1,
            fill: false
          }
        }
      },
      data
    });
  }

  canvasEl: ?HTMLCanvasElement = null;

  render() {
    return (
      <div className="chart">
        <canvas
          ref={canvasEl => {
            this.canvasEl = canvasEl;
          }}
        />
      </div>
    );
  }
}
