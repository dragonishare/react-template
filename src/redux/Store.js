import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './Modules/Reducers';

//官方推荐线上环境时用createBrowserHistory，开发环境的时候可以使用createHashHistory，hash方式会在URL加上#
//
export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [reduxThunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
