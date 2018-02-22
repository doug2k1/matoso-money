// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import Sidebar from './Sidebar';
import Icon from './Icon';
import Page from './pages/Page';
import HomePage from './pages/HomePage';
import ProjectionPage from './pages/ProjectionPage';
import PerformancePage from './pages/PerformancePage';
import InvestmentsPage from './pages/InvestmentsPage';
import '../styles/main.scss';

type State = {
  menuOpen: boolean
};

class App extends React.Component<{}, State> {
  state = {
    menuOpen: false
  };

  handleMenuToggleClick = (e: Event) => {
    e.stopPropagation();

    this.setState(currentState => ({
      menuOpen: !currentState.menuOpen
    }));
  };

  handleOutsideClick = () => {
    this.setState({
      menuOpen: false
    });
  };

  render() {
    const { menuOpen } = this.state;
    const classNames = classnames('main-grid', {
      'menu-open': menuOpen
    });

    return (
      <div className={classNames} onClick={this.handleOutsideClick}>
        <a href="/" className="logo">
          <b>My</b>Money
        </a>
        <Sidebar />
        <header className="main-header">
          <button className="menu-toggle" onClick={this.handleMenuToggleClick}>
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

export default App;
