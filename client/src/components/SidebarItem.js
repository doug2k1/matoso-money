// @flow
import React from 'react';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';
import Icon, { type IconName } from './Icon';

type Props = {
  icon: IconName,
  label: string,
  path: string,
  activeOnlyWhenExact?: boolean
};

export default class SidebarItem extends React.Component<Props, {}> {
  render() {
    const { icon, label, path, activeOnlyWhenExact } = this.props;

    return (
      <Route
        path={path}
        exact={activeOnlyWhenExact}
        children={({ match }) => {
          const className = classNames('menu-item', { active: match });
          return (
            <li className={className}>
              <Link to={path}>
                <Icon name={icon} />
                <span>{label}</span>
              </Link>
            </li>
          );
        }}
      />
    );
  }
}
