import api from '../../services/api';
import { processError, loading } from '../Modules/Common.js';

export const USER = 'User/USER';

//查询历史视频
export const getUsers = (queryCondition, successCallback) => {
  return dispatch => {
    console.log('getUsers action');
    // dispatch(loading(true));
    api.getUsers(queryCondition).end((err, res) => {
      const hasError = processError(dispatch, err, res); //res.body.code:0成功 code:26006失败
      if (!hasError) {
        dispatch({
          type: USER,
          items: res.body.data
        });
        if (successCallback) {
          successCallback();
        }
        dispatch(loading(false));
      }
    });
  };
};

//删除
/* export const deleteRecord = (queryCondition, successCallback) => {
  return dispatch => {
    console.log('deleteRecord action');
    api.deleteRecord(queryCondition).end((err, res) => {
      const hasError = processError(dispatch, err, res); //res.body.code:0成功 code:26006失败
      if (!hasError) {
        dispatch({
          type: DELETERECORD,
          record: queryCondition
        });
        if (successCallback) {
          successCallback(res);
        }
      }
    });
  };
}; */

export default (state = { items: null }, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        items: action.items
      };
    default:
      return state;
  }
};
