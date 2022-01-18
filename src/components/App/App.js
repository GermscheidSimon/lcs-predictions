import './App.css';
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import AppMenu from '../AppMenu/AppMenu'
import PickEmGroup from '../PickEmGroup/PickEmGroup'
import LoginForm from '../LoginForm/LoginForm'

function App(props) {

  const [profile, setProfile] = useState({})

  const fetchUser = () => {
    props.dispatch({ type: 'FETCH_USER' })
  }

  useEffect(() => {
    fetchUser()
  }, [profile])
  

  return (
    <div className="App">
      <AppMenu />
      <LoginForm />
      <h1>application</h1>
        <button>test</button>
      <PickEmGroup />
    </div>
  );
}

export default connect(mapStoreToProps)(App);
