import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      crossDomain: true
    };
    const serverURL = process.env.REACT_APP_URL
    const response = yield axios.get(`${serverURL}/api/user`, config);

    yield put({ type: 'SET_USER', payload: {...response.data, render: "COMPLETE" }});
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;