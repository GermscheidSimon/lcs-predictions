import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';
const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  crossDomain: true
}

function* fetchSchedule(action) {
    try {
      
      const scheduleData = yield axios.get(`https://pro-lague-api.herokuapp.com/api/schedule/fetchSchedules`, config)

      yield put({
          type: "SET_SCHEDULE", 
          payload: scheduleData.data
      });
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch schedule!',error);
      alert('Failed to Load your schedule information! Please try again.')
    }
  }


  function* ScheduleSaga() {
      yield takeLatest('FETCH_SCHEDULE', fetchSchedule)

    }
  
  export default ScheduleSaga;