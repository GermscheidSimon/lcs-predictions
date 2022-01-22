import { combineReducers } from 'redux';

//
import schedule from './schedule.reducer'
import pickEmGroup from './pickEmGroup.reducer';
import errors from './error.reducer'
import user from './user.reducer'

const rootReducer =  combineReducers({
  schedule,
  pickEmGroup,
  errors,
  user
})

export default rootReducer;