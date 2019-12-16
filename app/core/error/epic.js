import { combineEpics } from 'redux-observable';
import * as Rx from 'rxjs';
import * as types from './actionTypes';
import * as actions from './actions';
import { retry } from '../util/retry';


const log = (action$, store, { client }) => action$.ofType(types.LOG)
  .mergeMap(action => client({
    method: 'POST',
    path: '/log',
    entity: action.payload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${store.getState().keycloak.token}`,
    },
  })
    .retryWhen(retry)
    .map(() => actions.logSuccess())
    .catch(() => Rx.Observable.of(actions.logFailure())));


export default combineEpics(log);
