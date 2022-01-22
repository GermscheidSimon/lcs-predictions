import './App.css';
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import AppMenu from '../AppMenu/AppMenu'
import PickEmGroup from '../PickEmGroup/PickEmGroup'
import LoginForm from '../LoginForm/LoginForm'


import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

  // login & register -- 
  import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // client side authorization 
  import LoginPage from '../LoginPage/LoginPage';
  import RegisterPage from '../RegisterPage/RegisterPage';


function App(props) {

  const fetchUser = async () => {
    await props.dispatch({ type: 'FETCH_USER' })
  }

  useEffect(() => {
    fetchUser()
  }, [])
  
  const logout = () => {
    props.dispatch({ type: 'LOGOUT' })
  }

  return (
    <div className="App"> 
      <AppMenu />

      <Router>
        <div className="appMain">
          <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              //component={AboutPage}
            />
            {
              props.store.user.render === "COMPLETE" ?
                  <ProtectedRoute
                  // if user signed in, display PickEmGroup, else display login
                  exact
                  path={`/home`}
                  authRedirect="/pickEmGroups"
                  component={LoginPage} 
                />
              :
              <></>

            }
            
            <ProtectedRoute
              // if user signed in, display PickEmGroup, else display login
              exact
              path={`/pickEmGroups`}
              component={PickEmGroup} 
            />
             
              {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404. Either Page does not exist, or server was unable to handle your request.</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default connect(mapStoreToProps)(App);
