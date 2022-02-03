import { all } from 'redux-saga/effects';

import ScheduleSaga from './schedule.saga'
import pickEmGroupSaga from './pickEmGroup.saga'
import loginSaga from './login.saga';
import userSaga from './user.saga';
import registrationSaga from './register.sage'

export default function* rootSaga() {
    yield all([
        ScheduleSaga(),
        pickEmGroupSaga(),
        loginSaga(),
        userSaga(),
        registrationSaga()
    ])
};
