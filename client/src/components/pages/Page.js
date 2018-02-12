// @flow
import * as React from 'react';

type Props = {
  title: string,
  children: React.Node
};

export default class Page extends React.Component<Props, {}> {
  render() {
    const { title, children } = this.props;

    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>{title}</h1>
        </section>
        <section className="content">{children}</section>
      </div>
    );
  }
}
