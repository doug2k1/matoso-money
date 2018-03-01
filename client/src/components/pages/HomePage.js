// @flow
import React from 'react';
import InfoBox from '../Infobox';
import TotalBalanceBox from '../infoboxes/TotalBalanceBox';
import EvolutionChart from '../charts/EvolutionChart';

export default class HomePage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="grid-3">
          <TotalBalanceBox />

          <InfoBox icon="line-chart" text="Projeção" value="2035" bg="aqua" />
        </div>
        <EvolutionChart />
      </div>
    );
  }
}
