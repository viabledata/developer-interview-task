/* eslint-disable react/jsx-filename-extension */
/* istanbul ignore file */
/* above leaves this file out of the jest test coverage check as we can't test index.js */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import ReactGA from 'react-ga4';
import App from './App';

// import { gaToken } from './constants/Config';

// ReactGA.initialize(gaToken);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
