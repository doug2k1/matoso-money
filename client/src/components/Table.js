// @flow
import React from 'react';

type Props = {
  columns: string[],
  data: string[][]
};

export default class Table extends React.Component<Props, {}> {
  render() {
    const { columns, data } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>{columns.map(column => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
}
