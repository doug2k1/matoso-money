// @flow
import * as React from 'react';

type Props = {
  name: string,
  photo: string | null
};

export default class UserBox extends React.Component<Props, {}> {
  render() {
    const { name, photo } = this.props;

    return (
      <div className="user-panel">
        <div className="image">
          {photo ? (
            <img src={photo} className="img" alt="user" />
          ) : (
            <span className="img">{name[0]}</span>
          )}
        </div>
        <div className="info">
          <p>{name}</p>
          <a href="/auth/logout">Sair</a>
        </div>
      </div>
    );
  }
}
