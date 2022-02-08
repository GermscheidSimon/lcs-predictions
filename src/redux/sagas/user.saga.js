import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    yield put({
      type:"SET_APP_STATUS",
      payload: {
        render: true,
        statusMessage: 'Loading user...',
        statusType: "Loading",
        renderTimeout: 10000
      }
    })
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      crossDomain: true
    };
    const serverURL = process.env.REACT_APP_URL
    const response = yield axios.get(`${serverURL}/api/user`, config);

    yield put({ type: 'SET_USER', payload: {...response.data, render: "COMPLETE" }});
    yield put({
      type:"UNSET_STATUS"
    })
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;