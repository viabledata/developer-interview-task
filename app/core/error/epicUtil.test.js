import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { errorObservable } from './epicUtil';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs';
import 'rxjs/add/operator/mergeMap';

describe('epicUtil', () => {
  it('can handle 403', done => {
    const action$ = ActionsObservable.of(
      { type: 'ERROR', formName: 'formName' },
    );
    Observable.concat(errorObservable(action$, {
      status: {
        code: 403,
      },
    })).toArray()
      .subscribe(result => {
        const unauthorised = result[0];
        const failureAction = result[1];
        expect(unauthorised.type).toEqual('HANDLE_UNAUTHORISED');
        failureAction.subscribe(data => {
          expect(data.type).toEqual('ERROR');
          done();
        });
      });
  });
  it('can handle any other exception', done => {
    const action$ = ActionsObservable.of(
      { type: 'FETCH_FORM_FAILURE', formName: 'formName' },
    );
    Observable.concat(errorObservable(action$, {
      status: {
        code: 500,
      },
    })).toArray()
      .subscribe(result => {
        const failureAction = result[0];
        const error = result[1];
        expect(error.type).toEqual('HANDLE_ERROR');
        failureAction.subscribe(data => {
          expect(data.type).toEqual('FETCH_FORM_FAILURE');
          done();
        });
      });
  });
});
