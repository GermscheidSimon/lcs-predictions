import { all } from 'redux-saga/effects';

import ScheduleSaga from './schedule.saga'
import pickEmGroupSaga from './pickEmGroup.saga'

export default function* rootSaga() {
    yield all([
        ScheduleSaga(),
        pickEmGroupSaga()
    ])
};