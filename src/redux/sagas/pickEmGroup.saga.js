import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchPickEmGroup(action) {
    try {
      console.log('fetch schedule');
      
      const pickEmGroup = yield axios.get(`api/pickEmGroup/getGroups`)

      yield put({
          type: "SET_PICKEM_GROUP", 
          payload: pickEmGroup.data
      });
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch schedule!',error);
      alert('Failed to Load your schedule information! Please try again.')
    }
  }


  function* ScheduleSaga() {
      yield takeLatest('FETCH_PICKEM_GROUP', fetchPickEmGroup)

    }
  
  export default ScheduleSaga;