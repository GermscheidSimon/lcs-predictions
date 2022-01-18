import { combineReducers } from 'redux';

//
import schedule from './schedule.reducer'
import pickEmGroup from './pickEmGroup.reducer';

const rootReducer =  combineReducers({
  schedule,
  pickEmGroup
})

export default rootReducer;