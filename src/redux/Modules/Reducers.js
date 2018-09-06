import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import login from './Login';
import user from './User';

export const LOADING = 'Common/LOADING';
function loading(state = false, action) {
  if (action.type === LOADING) {
    return action.isLoading;
  }
  return state;
}

export const ERROR = 'Common/ERROR';
function error(state = { hasError: false }, action) {
  if (action.type === ERROR) {
    if (state.hasError || action.hasError) {
      return {
        errorCode: action.errorCode,
        hasError: action.hasError,
        message: action.message
      };
    }
  }
  return state;
}

const rootReducer = combineReducers({
  router: routerReducer,
  loading,
  error,
  login,
  user
});

export default rootReducer;
