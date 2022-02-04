import React from 'react';
import ReactDOM from 'react-dom';

console.log(env)

// Redux // Sagas
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './redux/reducers/_root.reducer';
import rootSaga from './redux/sagas/_root.saga';
// redux longer
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// Component Imports
import App from './components/App/App';

const sagaMiddleware = createSagaMiddleware();

const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

// Create Store
const store = createStore(
  rootReducer,
  applyMiddleware(...middlewareList),
);

sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider >
  </React.StrictMode>,
  document.getElementById('react-root')
);
