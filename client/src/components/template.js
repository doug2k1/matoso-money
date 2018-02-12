import React from 'react';
import 'Styles/main.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className="main-grid">
        <aside className="main-sidebar">
          <a href="/" className="logo">
            <b>My</b>Money
          </a>
          <ul className="sidebar-menu">
            <li className="header">Main</li>
            <li className="menu-item active">
              <a href="/dashboard">
                <svg className="icon icon-dashboard">
                  <use xlinkHref="#icon-dashboard" />
                </svg>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="menu-item">
              <a href="/dashboard">
                <svg className="icon icon-line-chart">
                  <use xlinkHref="#icon-line-chart" />
                </svg>
                <span>Projeção</span>
              </a>
            </li>
            <li className="menu-item">
              <a href="/dashboard">
                <svg className="icon icon-percent">
                  <use xlinkHref="#icon-percent" />
                </svg>
                <span>Performance</span>
              </a>
            </li>
            <li className="menu-item">
              <a href="/dashboard">
                <svg className="icon icon-pie-chart">
                  <use xlinkHref="#icon-pie-chart" />
                </svg>
                <span>Distribuição</span>
              </a>
            </li>
          </ul>
        </aside>
        <div className="content-wrapper">
          <header className="main-header" />
          <section className="content-header">
            <h1>Dashboard</h1>
          </section>
          <section className="content">
            <div className="grid-3">
              <div className="info-box">
                <span className="info-box-icon bg-aqua">
                  <svg className="icon icon-line-chart">
                    <use xlinkHref="#icon-line-chart" />
                  </svg>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Projeção Ano</span>
                  <span className="info-box-number">2035</span>
                </div>
              </div>

              <div className="info-box">
                <span className="info-box-icon bg-green">
                  <svg className="icon icon-percent">
                    <use xlinkHref="#icon-percent" />
                  </svg>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Performance mês</span>
                  <span className="info-box-number">
                    1,1<small>%</small>
                  </span>
                </div>
              </div>
            </div>

            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Projeção</h3>
              </div>
              <div className="box-body">[chart]</div>
            </div>

            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Form</h3>
              </div>
              <div className="box-body grid-3">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <select className="form-control" id="exampleInputEmail1">
                    <option>option 1</option>
                    <option>option 2</option>
                    <option>option 3</option>
                    <option>option 4</option>
                    <option>option 5</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputVal">Aplicado</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputVal"
                    placeholder="0,00"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputTotal">Total</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputTotal"
                    placeholder="0,00"
                  />
                </div>
              </div>
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>

            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Objetivo</h3>
              </div>
              <div className="box-body grid-3">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Meta (R$)</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="0,00"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputVal">Data</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputVal"
                    placeholder="01/12/2050"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputTotal">
                    Rendimento anual (%)
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputTotal"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>

            <button type="button" className="btn">
              Default
            </button>
            <button type="button" className="btn btn-success">
              Success
            </button>
            <button type="button" className="btn btn-danger">
              Danger
            </button>
            <button type="button" className="btn btn-primary btn-icon">
              <svg className="icon icon-plus">
                <use xlinkHref="#icon-plus" />
              </svg>
              <span>Primary</span>
            </button>

            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Tabela</h3>
              </div>
              <div className="box-body no-padding">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Projetado</th>
                      <th>Aplicado</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jan/2017</td>
                      <td>$1,400.00</td>
                      <td>$1,885.00</td>
                      <td>$1,885.00</td>
                    </tr>
                    <tr>
                      <td>Feb/2017</td>
                      <td>$2,811.67</td>
                      <td>$2,451.51</td>
                      <td>$2,940.00</td>
                    </tr>
                    <tr>
                      <td>Mar/2017</td>
                      <td>$4,235.10</td>
                      <td>$2,969.21</td>
                      <td>$3,484.55</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
