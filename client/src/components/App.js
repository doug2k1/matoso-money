// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Icon from './Icon';
import Page from './pages/Page';
import HomePage from './pages/HomePage';
import ProjectionPage from './pages/ProjectionPage';
import PerformancePage from './pages/PerformancePage';
import InvestmentsPage from './pages/InvestmentsPage';
import 'Styles/main.scss';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="main-grid">
        <a href="/" className="logo">
          <b>My</b>Money
        </a>
        <Sidebar />
        <header className="main-header">
          <button className="menu-toggle">
            <Icon name="bars" />
          </button>
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <Page title="Dashboard">
              <HomePage />
            </Page>
          )}
        />
        <Route
          path="/projection"
          render={() => (
            <Page title="Projection">
              <ProjectionPage />
            </Page>
          )}
        />
        <Route
          path="/performance"
          render={() => (
            <Page title="Performance">
              <PerformancePage />
            </Page>
          )}
        />
        <Route
          path="/investments"
          render={() => (
            <Page title="Aplicações">
              <InvestmentsPage />
            </Page>
          )}
        />
      </div>
    );
  }
}
