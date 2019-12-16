import * as types from './actionTypes';

const fetchTaskCounts = () => ({
  type: types.FETCH_TASK_COUNTS,
});

const setDefaultCounts = () => ({
  type: types.SET_DEFAULT_COUNTS,
});

const fetchTaskCountsSuccess = payload => ({
  type: types.FETCH_TASK_COUNTS_SUCCESS,
  payload,
});

const fetchTaskCountsFailure = () => ({
  type: types.FETCH_TASK_COUNTS_FAILURE,
});

const fetchMessageCounts = () => ({
  type: types.FETCH_NOTIFICATIONS_COUNT,
});
const fetchMessageCountsSuccess = payload => ({
  type: types.FETCH_NOTIFICATIONS_COUNT_SUCCESS,
  payload,
});
const fetchMessageCountsFailure = () => ({
  type: types.FETCH_NOTIFICATIONS_COUNT_FAILURE,
});


export {
  fetchTaskCounts,
  fetchTaskCountsSuccess,
  fetchTaskCountsFailure,
  fetchMessageCounts,
  fetchMessageCountsSuccess,
  fetchMessageCountsFailure,
  setDefaultCounts,
};
