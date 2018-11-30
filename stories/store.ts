import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { reducer as NotificationReducer } from '../src';

const reducers = combineReducers({
  notifications: NotificationReducer
});

const store = createStore(reducers,applyMiddleware(thunkMiddleware));

export default store;
