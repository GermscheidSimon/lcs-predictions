import './App.css';
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import AppMenu from '../AppMenu/AppMenu'
import ListPickEmGroups from '../PickEmGroup/ListPickEmGroups'

import DateHelper from '../../Helpers/DateHelper.js';


import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

  // login & register -- 
  import LoginPage from '../LoginPage/LoginPage';
  import PickEmGroup from '../PickEmGroup/PickEmGroup';

const Home = () => {
  const navigate = useNavigate()
  useEffect(() =>{
    navigate('/home', { replace: true })
  }, [])

  return <></> 
}
function App(props) {

  const fetchUser = async () => {
    await props.dispatch({ type: 'FETCH_USER' })

    const time = DateHelper.getCurrentTime();
    const toCmp = new Date('2022/1/31');
    const isSameWeek = DateHelper.checkIfSameWeek(toCmp);
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

          <BrowserRouter>
            <div className="appMain">
          <Routes >
            <Route path={'/'} element={ <Home/>} />

            {
              props.store.user.render === "COMPLETE" ?
                  <Route
                  // if user signed in, display PickEmGroup, else display login
                    path={`/home`}
                    element={<LoginPage />} 
                  />
              :
              <></>

            }
            
            <Route
              path={`/ListPickEmGroups`}
              element={<ListPickEmGroups />} 
            />
            <Route
              path='/pickEmGroup/:id'
              element={<PickEmGroup />} 
            />
             
              {/* If none of the other routes matched, we will show a 404. */}
            
          </Routes >
        </div>
      </BrowserRouter>
    </div>
  );
}

export default connect(mapStoreToProps)(App);
