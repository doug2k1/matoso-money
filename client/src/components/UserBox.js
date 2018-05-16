// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USER = gql`
  {
    user {
      displayName
      photo
    }
  }
`;

export default class UserBox extends React.Component<{}, {}> {
  render() {
    return (
      <div className="user-panel">
        <Query query={GET_USER}>
          {({ data }) => {
            if (!data || !data.user) return null;

            return (
              <React.Fragment>
                <div className="image">
                  {data.user.photo ? (
                    <img src={data.user.photo} className="img" alt="user" />
                  ) : (
                    <span className="img">{data.user.displayName[0]}</span>
                  )}
                </div>
                <div className="info">
                  <p>{data.user.displayName}</p>
                  <a href="/auth/logout">Sair</a>
                </div>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}
