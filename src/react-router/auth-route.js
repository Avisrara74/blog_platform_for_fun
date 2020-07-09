/* eslint react/prop-types: 0 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { mainUrl } from '../routes';

const AuthRoute = (props) => {
  const { children, isAuthorized, ...rest } = props;

  return (
    <Route
      {...rest}
      render={() => (isAuthorized ? <Redirect to={mainUrl} /> : children)}
    />
  );
};

export default connect((state) => ({
  isAuthorized: state.userData.isAuthorized,
}), null)(AuthRoute);
