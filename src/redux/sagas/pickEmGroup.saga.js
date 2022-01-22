import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchPickEmGroup(action) {
    try {
      console.log('fetch schedule');
      
      const pickEmGroup = yield axios.get(`api/pickEmGroup/getMyGroups`)

      yield put({
          type: "SET_PICKEM_GROUP", 
          payload: pickEmGroup.data[0]
      });
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch schedule!',error);
      alert('Failed to Load your schedule information! Please try again.')
    }
  }


  function* pickEmGroupSaga() {
      yield takeLatest('FETCH_PICKEM_GROUP', fetchPickEmGroup)

    }
  
  export default pickEmGroupSaga;