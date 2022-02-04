import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  // Using destructuring, this takes ComponentToProtect from component
  // prop and grabs all other props to pass them along to Route
  const {
    // Alias prop 'component' as 'ComponentToProtect'
    component: ComponentToProtect,
    // redirect path to be used if the user is authorized
    authRedirect,
    store,
    ...otherProps
  } = props;

  let ComponentToShow;

  if (store.user._id) {
    // if the user is logged in (only logged in users have ids)
    // show the component that is protected
    ComponentToShow = ComponentToProtect;
  } else {
    // if they are not logged in, check the loginMode on Redux State
    // if the mode is 'login', show the LoginPage
    ComponentToShow = LoginPage;
  }

  // redirect a logged in user if an authRedirect prop has been provided
  if (store.user._id && authRedirect != null) {


    return useNavigate(otherProps.authRedirect);
  } else if (!store.user._id && authRedirect != null) {
    ComponentToShow = ComponentToProtect;
  }

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      path={otherProps.path}
      element={ComponentToShow}
    />
  );
};

export default connect(mapStoreToProps)(ProtectedRoute);