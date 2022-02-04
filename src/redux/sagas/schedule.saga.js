import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchSchedule(action) {
    try {
      
      const scheduleData = yield axios.get(`/api/schedule/fetchSchedules`)

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