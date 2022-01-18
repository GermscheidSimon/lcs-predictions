import './App.css';
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import AppMenu from '../AppMenu/AppMenu'
import PickEmGroup from '../PickEmGroup/PickEmGroup'

function App(props) {

  const [profile, setProfile] = useState({})

  const fetchUser = () => {

  }

  useEffect(() => {
    fetchUser()
  }, [profile])
  

  return (
    <div className="App">
      <AppMenu />
      <h1>application</h1>
        <button>test</button>
      <PickEmGroup />
    </div>
  );
}

export default connect(mapStoreToProps)(App);
