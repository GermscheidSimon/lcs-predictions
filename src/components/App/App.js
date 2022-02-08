import './App.css';
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import AppMenu from '../AppMenu/AppMenu'
import ListPickEmGroups from '../PickEmGroup/ListPickEmGroups'

import DateHelper from '../../Helpers/DateHelper.js';
import AppStatusBar from '../AppStatusBar/AppStatusBar'


import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation
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

const Redirect = (props) => {
  let CompToShow = props.component
  
  const checkforuser = () => {
    if(props.user.render === 'COMPLETE'  && props.user.username !== undefined) {
      return true
    } else {
      return false
    }
  }
  const checkForAuthComp = () => {
    if(!props.authredict && props.authComp !== undefined) {
      CompToShow = props.authComp
    }
  }
  checkForAuthComp()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  useEffect(() =>{
    if(checkforuser()){
      if(props.authredict) {
        navigate(`${props.path}`, { replace: true })
      }
    } else {
      if(props.authredict !== true) {
        navigate(`${props.path}`, { replace: true })
      }
    }
    
  }, [props.user.username])
  return < CompToShow location={location} params={params}/>
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
      <AppStatusBar />

          <BrowserRouter>
            <div className="appMain">
          <Routes >
            <Route path={'/'} element={ <Home/>} />

            {
              props.store.user.render === "COMPLETE" ?
                <>
                  <Route
                  // if user signed in, display PickEmGroup, else display login
                    path={`/home`}
                    element={<Redirect path={'/ListPickEmGroups'} authredict={true} user={props.store.user} component={LoginPage}/>} 
                  />
                  <Route
                    path={`/ListPickEmGroups`}
                    element={<Redirect path={'/home'} user={props.store.user} user={props.store.user} authredict={false} component={LoginPage} authComp={ListPickEmGroups}/>} 
                  />
                  <Route
                    path='/pickEmGroup/:id'
                    element={<Redirect path={'/home'} user={props.store.user} user={props.store.user} authredict={false} component={LoginPage} authComp={PickEmGroup}/>} 
                  />
                </>
              :
              <></>

            }
            
          </Routes >
        </div>
      </BrowserRouter>
    </div>
  );
}

export default connect(mapStoreToProps)(App);
