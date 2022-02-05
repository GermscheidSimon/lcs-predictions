import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';
const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  crossDomain: true
}

function* fetchPickEmGroup(action) {
    try {
      
      const pickEmGroup = yield axios.get(`https://pro-lague-api.herokuapp.com/api/pickEmGroup/getMyGroups`, config)

      yield put({
          type: "SET_PICKEM_GROUP", 
          payload: pickEmGroup.data
      });
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch schedule!',error);
    }
  }
function* fetchGroupByID(action){ 
    try {
        const pickemGroup = yield axios.get(`https://pro-lague-api.herokuapp.com/api/pickEmGroup/getGroup/${action.payload}`, config)

        yield put({
            type: "SET_GROUP",
            payload: pickemGroup.data[0]
        })
    } catch (error) {
        //  client error if unsuccessful
      console.log('Failed to fetch schedule!',error);
    }
}
function* fetchTeams(action){ 
  try {
      const standingsData = yield axios.get(`https://pro-lague-api.herokuapp.com/api/schedule/getstandings/${action.payload}`, config)
      const standings = standingsData.data.data.standings[0].stages[0].sections[0].rankings
      let teams = []
      for (const rank of standings) {
        teams.push(...rank.teams)
      }
      
      yield put({
          type: "SET_TEAMS",
          payload: teams
      })
  } catch (error) {
      //  client error if unsuccessful
  }
}

function* updatePrediction(action){ 
  try {
      yield axios.post(`https://pro-lague-api.herokuapp.com/api/pickEmGroup/prediction`, action.payload, config)
      
      yield put({
          type: "FETCH_GROUP_BY_ID",
          payload: {id: action.payload.groupID}
      })
  } catch (error) {
      //  client error if unsuccessful
    console.log('Failed to update Prediction!',error);
  }
}
function* joinGroup(action){ 
  try {
      yield axios.put(`https://pro-lague-api.herokuapp.com/api/pickEmGroup/joinGroup`, {code: action.payload}, config)
      

  } catch (error) {
      //  client error if unsuccessful
    console.log('Failed to update joinGroup!',error);
  }
}


  function* pickEmGroupSaga() {
      yield takeLatest('FETCH_PICKEM_GROUP', fetchPickEmGroup)
      yield takeLatest('FETCH_GROUP_BY_ID', fetchGroupByID )
      yield takeLatest('FETCH_TEAMS', fetchTeams)
      yield takeLatest('UPDATE_PREDICTION', updatePrediction)
      yield takeLatest('JOIN_GROUP', joinGroup)
    }
  
  export default pickEmGroupSaga;