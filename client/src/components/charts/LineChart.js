// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Chart from 'chart.js';

export default class LineChart extends React.Component<{}, {}> {
  canvasEl: ?HTMLCanvasElement = null;

  componentDidMount() {
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
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Warren',
            borderColor: '#ff0000',
            backgroundColor: '#ff0000',
            data: [1.1, 1.8, 2.3, 3.6]
          },
          {
            label: 'Tesouro Selic',
            borderColor: '#0000ff',
            backgroundColor: '#0000ff',
            data: [0.3, 0.7, 1.1, 2.5]
          }
        ]
      }
    });
  }

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
