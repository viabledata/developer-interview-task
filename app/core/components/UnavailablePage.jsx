import React from 'react';

const UnavailablePage = () => (
  <div style={{ marginTop: '20px' }} className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="error-summary">
    <h2 className="govuk-error-summary__title" id="error-summary-title">
      Sorry, the service is unavailable.
    </h2>
    <div className="govuk-error-summary__body">
      <p>Try again later. </p>

      <p>Your answers were not saved. When the service is available, you will have to start again. </p>

      <p>Contact the COP Service Support Desk if you have any questions: <a href="https://support.cop.homeoffice.gov.uk/servicedesk/customer/portal/3/">COP Online Support</a> </p>

      <h3>Support hours:</h3>

      <p>Monday to Friday: 8am to 6pm </p>
    </div>
  </div>
);

export default UnavailablePage;
