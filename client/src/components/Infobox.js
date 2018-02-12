// @flow
import React from 'react';
import Icon, { type IconName } from './Icon';

export type InfoBoxBG = 'aqua' | 'green';

type Props = {
  bg: InfoBoxBG,
  icon: IconName,
  text: string,
  value: string,
  unity?: string
};

export default class InfoBox extends React.Component<Props, {}> {
  render() {
    const { icon, bg, text, value, unity } = this.props;

    return (
      <div className="info-box">
        <span className={`info-box-icon bg-${bg}`}>
          <Icon name={icon} />
        </span>
        <div className="info-box-content">
          <span className="info-box-text">{text}</span>
          <span className="info-box-number">
            {value}
            {unity && <small>{unity}</small>}
          </span>
        </div>
      </div>
    );
  }
}
