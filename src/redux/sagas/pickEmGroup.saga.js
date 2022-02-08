import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';
const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  crossDomain: true
}
const serverURL = process.env.REACT_APP_URL

function* fetchPickEmGroup(action) {
    try {
      yield put({
        type:"SET_APP_STATUS",
        payload: {
          render: true,
          statusMessage: 'Fetching Groups...',
          statusType: "Loading",
        }
      })
      
      const pickEmGroup = yield axios.get(`${serverURL}/api/pickEmGroup/getMyGroups`, config)

      yield put({
          type: "SET_PICKEM_GROUP", 
          payload: pickEmGroup.data
      });
      yield put({
        type:"UNSET_STATUS"
      })
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch schedule!',error);
    }
  }
function* fetchGroupByID(action){ 
    try {
      yield put({
        type:"SET_APP_STATUS",
        payload: {
          render: true,
          statusMessage: 'Fetching Group...',
          statusType: "Loading",
        }
      })
        const pickemGroup = yield axios.get(`${serverURL}/api/pickEmGroup/getGroup/${action.payload}`, config)

        yield put({
            type: "SET_GROUP",
            payload: pickemGroup.data[0]
        })
        yield put({
          type:"UNSET_STATUS"
        })
    } catch (error) {
        //  client error if unsuccessful
      console.log('Failed to fetch schedule!',error);
    }
}
function* fetchTeams(action){ 
  try {
      yield put({
        type:"SET_APP_STATUS",
        payload: {
          render: true,
          statusMessage: 'Getting standings...',
          statusType: "Loading",
        }
      })

      const standingsData = yield axios.get(`${serverURL}/api/schedule/getstandings/${action.payload}`, config)
      const standings = standingsData.data.data.standings[0].stages[0].sections[0].rankings
      let teams = []
      for (const rank of standings) {
        teams.push(...rank.teams)
      }
      
      yield put({
          type: "SET_TEAMS",
          payload: teams
      })
      yield put({
        type:"UNSET_STATUS"
      })
  } catch (error) {
      //  client error if unsuccessful
  }
}

function* updatePrediction(action){ 
  try {
      yield put({
        type:"SET_APP_STATUS",
        payload: {
          render: true,
          statusMessage: 'Saving Your Predictions',
          statusType: "Loading",
        }
      })
      yield axios.post(`https://pro-lague-api.herokuapp.com/api/pickEmGroup/prediction`, action.payload, config)
      
      yield put({
          type: "FETCH_GROUP_BY_ID",
          payload: {id: action.payload.groupID}
      })
      yield put({
        type:"SET_APP_STATUS",
        payload: {
          render: true,
          statusMessage: 'Save Success!',
          statusType: "Success",
        }
      })
      setTimeout(() => {
        yield put({
          type:"UNSET_STATUS"
        }),
        3000
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