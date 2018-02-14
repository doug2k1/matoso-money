// @flow
import React from 'react';

type Props = {
  columns: string[],
  data: string[][]
};

class Table extends React.Component<Props, {}> {
  render() {
    const { columns, data } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>{columns.map(column => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>{data.map(row => <TableRow cells={row} />)}</tbody>
      </table>
    );
  }
}

type TableRowProps = {
  cells: any[]
};

class TableRow extends React.Component<TableRowProps, {}> {
  render() {
    const { cells } = this.props;

    return <tr>{cells.map(cell => <td key={cell}>{cell}</td>)}</tr>;
  }
}

export default Table;
