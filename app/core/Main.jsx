import 'babel-polyfill';

import React, { Suspense, lazy }  from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import AppConstants from '../common/AppConstants';
import DataSpinner from './components/DataSpinner';

const DashboardPage = lazy(() => import('../pages/dashboard/components/DashboardPage'));

const Main = () => (
  <main style={{paddingTop: '10px'}} className="govuk-main-wrapper" id="main-content" role="main">
    <Suspense fallback={<div style={{ justifyContent: 'center'}}><DataSpinner message="Loading routes"/></div>}>
      <Switch>
        <Route name="Dashboard" exact path={AppConstants.DASHBOARD_PATH} component={() => <DashboardPage />}/>
        <Redirect to={AppConstants.DASHBOARD_PATH}/>
      </Switch>
    </Suspense>
  </main>
);

export default Main
