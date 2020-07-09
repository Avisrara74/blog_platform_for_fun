/* eslint react/prop-types: 0 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInUrl } from '../routes';

const PrivateRoute = (props) => {
  const { children, isAuthorized, ...rest } = props;

  return (
    <Route
      {...rest}
      render={() => (isAuthorized ? children : <Redirect to={signInUrl} />)}
    />
  );
};

export default connect((state) => ({
  isAuthorized: state.userData.isAuthorized,
}), null)(PrivateRoute);
