import { combineReducers } from 'redux';

//
import schedule from './schedule.reducer'
import pickEmGroup from './pickEmGroup.reducer';
import errors from './error.reducer'
import user from './user.reducer'
import group from './groupData.reducer';
import teams from './teams.reducer'

const rootReducer =  combineReducers({
  schedule,
  pickEmGroup,
  errors,
  user,
  group,
  teams
})

export default rootReducer;