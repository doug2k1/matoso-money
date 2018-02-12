// @flow
import React from 'react';
import icons from '../../src/images/icons.svg';

export type IconName =
  | 'bars'
  | 'dashboard'
  | 'line-chart'
  | 'percent'
  | 'pie-chart'
  | 'plus'
  | 'save'
  | 'trash-o'
  | 'usd-circle';

type Props = {
  name: IconName
};

export default class Icon extends React.Component<Props, {}> {
  render() {
    const { name } = this.props;

    return (
      <svg className={`icon icon-${name}`}>
        <use xlinkHref={`${icons}#icon-${name}`} />
      </svg>
    );
  }
}
