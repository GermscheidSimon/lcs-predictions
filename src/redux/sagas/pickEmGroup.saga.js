import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';


function* fetchPickEmGroup(action) {
    try {
      
      const pickEmGroup = yield axios.get(`api/pickEmGroup/getMyGroups`)

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
function* fetchGroupByID(action){ 
    try {
        const pickemGroup = yield axios.get(`/api/pickEmGroup/getGroup/${action.payload.id}`)

        yield put({
            type: "SET_GROUP",
            payload: pickemGroup.data[0]
        })
    } catch (error) {
        //  client error if unsuccessful
      console.log('Failed to fetch schedule!',error);
      alert('Failed to Load your schedule information! Please try again.')
    }
}
function* fetchTeams(action){ 
  try {
      const standingsData = yield axios.get(`/api/schedule/getstandings/${action.payload}`)
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
    console.log('Failed to fetch teams!',error);
  }
}

function* updatePrediction(action){ 
  try {
      yield axios.post(`/api/pickEmGroup/prediction`, action.payload)
      
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
      yield axios.put(`/api/pickEmGroup/joinGroup`, {code: action.payload})
      

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