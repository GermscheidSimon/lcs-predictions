import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
const serverURL = process.env.REACT_APP_URL

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {

    yield put({ 
      type: 'SET_APP_STATUS',
      payload: {
        render: true,
        statusMessage: 'Logging In...',
        statusType: "Loading",
        renderTimeout: 1000
      }
     });
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.post(`${serverURL}/api/user/login`, action.payload, config);


    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 401) {

      yield put({ type: 'LOGIN_FAILED' });
      yield put({
        type: 'SET_APP_STATUS',
        payload: {
          render: true,
          statusMessage: 'LOGIN FAILED',
          statusType: "Error",
          renderTimeout: 2000
        }
      })
    } else {

      yield put({ type: 'LOGIN_FAILED_NO_CODE' });
      yield put({
        type: 'SET_APP_STATUS',
        payload: {
          render: true,
          statusMessage: 'LOGIN FAILED',
          statusType: "Error",
        }
      })
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      crossDomain: true
    };

    yield axios.get(`${serverURL}/api/user/logout`, config);


    yield put({ type: 'UNSET_USER' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;