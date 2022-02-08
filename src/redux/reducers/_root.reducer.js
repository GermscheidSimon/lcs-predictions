import { combineReducers } from 'redux';

//
import schedule from './schedule.reducer'
import pickEmGroup from './pickEmGroup.reducer';
import errors from './error.reducer'
import user from './user.reducer'
import group from './groupData.reducer';
import teams from './teams.reducer'
import appStatus from './appStatus.reducer'

const rootReducer =  combineReducers({
  schedule,
  pickEmGroup,
  errors,
  user,
  group,
  teams,
  appStatus
})

export default rootReducer;