// @flow
import React from 'react';
import SidebarItem from './SidebarItem';
import UserBox from './UserBox';

export default class Sidebar extends React.Component<{}, {}> {
  render() {
    return (
      <aside className="main-sidebar">
        <UserBox />
        <ul className="sidebar-menu">
          <li className="header">Main</li>
          <SidebarItem
            icon="dashboard"
            label="Dashboard"
            path="/"
            activeOnlyWhenExact
          />
          <SidebarItem icon="line-chart" label="Projeção" path="/projection" />
          <SidebarItem icon="percent" label="Performance" path="/performance" />
        </ul>
      </aside>
    );
  }
}
