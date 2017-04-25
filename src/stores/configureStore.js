import {combineReducers, createStore} from 'redux';
import {routerReducer} from 'react-router-redux';

export default function configureStore(initialState = {}, middleware) {
  const rootReducer = combineReducers({
    routerReducer
  });

  return createStore(rootReducer, initialState, middleware);
}
