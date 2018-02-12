// @flow
import React, { Fragment } from 'react';
import InfoBox from '../Infobox';
import Box from '../Box';

export default class HomePage extends React.Component<{}, {}> {
  render() {
    return (
      <Fragment>
        <div className="grid-3">
          <InfoBox icon="line-chart" text="Projeção" value="2035" bg="aqua" />
          <InfoBox
            icon="percent"
            text="Performance"
            value="1,1"
            unity="%"
            bg="green"
          />
        </div>

        <Box />
      </Fragment>
    );
  }
}
