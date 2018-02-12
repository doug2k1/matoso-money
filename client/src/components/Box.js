// @flow
import * as React from 'react';

type Props = {
  title?: string,
  children: React.Node,
  header?: React.Node,
  footer?: React.Node
};

export default class Box extends React.Component<Props, {}> {
  render() {
    const { title, children, header, footer } = this.props;

    return (
      <div className="box box-primary">
        {(title || header) && (
          <div className="box-header">
            <h3 className="box-title">{title}</h3>
            <div className="box-header-contents">{header}</div>
          </div>
        )}
        <div className="box-body">{children}</div>
        {footer && <div className="box-footer">{footer}</div>}
      </div>
    );
  }
}
