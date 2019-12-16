import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './core/App';
import configureStore from './core/store/configureStore';
import 'webpack-icons-installer/bootstrap';
import '../public/styles/app.scss';
import 'govuk-frontend/govuk/core/_typography.scss';
import 'rxjs';
import AppConstants from './common/AppConstants';
import ScrollToTop from './core/components/ScrollToTop';
import Header from './core/components/Header';
import Footer from './core/components/Footer';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { Formio } from 'react-formio';
import gds from '@digitalpatterns/formio-gds-template';
import secureLocalStorage from './common/security/SecureLocalStorage';
import qs from "querystring";
import axios from 'axios';
import jwt_decode from "jwt-decode";

const store = configureStore();
let kc = null;

Formio.use(gds);


const renderApp = (App, config) => {
  // keycloak token refresh goes here:
  // 
  // kc.onTokenExpired = () => {
  //   kc.updateToken().success(refreshed => {
  //     if (refreshed) {
  //       store.getState().keycloak = kc;
  //     }
  //   }).error(() => {
  //     kc.logout();
  //   });
  // };

  // keycloak authentication goes here:
  // ... removed for practical test
  //
  const rootDocument = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <AppContainer>
          <Router history={createBrowserHistory()}>
            <ScrollToTop>
              <App />
            </ScrollToTop>
          </Router>
        </AppContainer>
      </div>
    </Provider>,
    rootDocument,
  );
};

const unavailable = () => {
  const rootDocument = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <AppContainer>
          <BrowserRouter>
            <div>
              <Header />
              <div className="container" style={{ height: '100vh' }}>
                <UnavailablePage />
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </AppContainer>
      </div>
    </Provider>,
    rootDocument,
  );
};

if (process.env.NODE_ENV === 'production') {
  fetch('/api/config')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Application configuration could not be loaded: ${response.status} ${response.statusMessage}`);
    }).then(data => {
      store.getState().appConfig = {
        uiVersion: data.UI_VERSION,
        uiEnvironment: data.UI_ENVIRONMENT,
        operationalDataUrl: data.OPERATIONAL_DATA_URL,
        workflowServiceUrl: data.WORKFLOW_SERVICE_URL,
        translationServiceUrl: data.TRANSLATION_SERVICE_URL,
        reportServiceUrl: data.REPORT_SERVICE_URL,
        analyticsUrl: data.ANALYTICS_URL,
        analyticsSiteId: data.ANALYTICS_SITE_ID,
      };
      renderApp(App, { formApi: { url: data.TRANSLATION_SERVICE_URL }});
    }).catch(err => {
      console.log('Unable to start application: ', err.message);
      unavailable();
    });
} else {
  const authAccessRole = process.env.WWW_KEYCLOAK_ACCESS_ROLE;
  store.getState().appConfig = {
    uiVersion: process.env.WWW_UI_VERSION,
    uiEnvironment: process.env.WWW_UI_ENVIRONMENT,
    operationalDataUrl: process.env.API_COP_URI,
    workflowServiceUrl: process.env.ENGINE_URI,
    translationServiceUrl: process.env.TRANSLATION_URI,
    reportServiceUrl: process.env.REPORT_URI
  };
  renderApp(App, { formApi: { url: process.env.TRANSLATION_URI }});
}
