import React from 'react';
import ReactDOM from 'react-dom';

// allows auto reloading in browser?
import { AppContainer } from 'react-hot-loader';

// for links/structure
import { Router, BrowserRouter } from 'react-router-dom';

// not sure about redux
import { Provider } from 'react-redux';

// assuming this is to allow back functions, rather than using the react-router-dom history
import { createBrowserHistory } from 'history';


import App from './core/App';

// local file
import configureStore from './core/store/configureStore';

// boostrap icons & local stylesheet & govuk typography stylesheet
import 'webpack-icons-installer/bootstrap';
import '../public/styles/app.scss';
import 'govuk-frontend/govuk/core/_typography.scss';

// not used rxjs before
import 'rxjs';

// local files
import AppConstants from './common/AppConstants';
import ScrollToTop from './core/components/ScrollToTop';
import Header from './core/components/Header';
import Footer from './core/components/Footer';

// not sure what this is for
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// react library for form.io forms
// (I've not used that before, but looks like a neat efficient way to manage forms)
// from the import gds I'd assume it's to ensure all forms follows the required standards / are all in one place
import { Formio } from 'react-formio';
import gds from '@digitalpatterns/formio-gds-template';

// I've not used but based on name I think it's about secure local storage!
import secureLocalStorage from './common/security/SecureLocalStorage';

// I've not used but I believe this is for generating query strings for node.js
import qs from "querystring";

// Axios I've used for neater/clearer fetching data from APIs
import axios from 'axios';

// JWT I've used for registration/login token creation/use/checking/etc
import jwt_decode from "jwt-decode";

// I think createstore is a redux feature for storing states, I've not used redux before
// need more time to understand it
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
