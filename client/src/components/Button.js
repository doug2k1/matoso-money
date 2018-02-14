// @flow
import React from 'react';
import classNames from 'classnames';
import Icon, { type IconName } from './Icon';

export type ButtonType = 'primary' | 'secondary' | 'success' | 'danger';

type Props = {
  label?: string,
  icon?: IconName,
  type: ButtonType,
  size: '' | 'small',
  disabled?: boolean
};

export default class Button extends React.Component<Props, {}> {
  static defaultProps = {
    type: 'primary',
    size: ''
  };

  render() {
    const { label, icon, type, size, disabled } = this.props;
    const className = classNames('btn', {
      'btn-icon': icon,
      disabled,
      [`btn-${type}`]: type,
      [`btn-${size}`]: size
    });

    return (
      <button className={className} disabled={disabled}>
        {icon && <Icon name={icon} />}
        {label && <span className="label">{label}</span>}
      </button>
    );
  }
}
