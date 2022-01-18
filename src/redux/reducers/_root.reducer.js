import { combineReducers } from 'redux';

//
import schedule from './schedule.reducer'
import pickEmGroup from './pickEmGroup.reducer';
import errors from './error.reducer'

const rootReducer =  combineReducers({
  schedule,
  pickEmGroup,
  errors
})

export default rootReducer;