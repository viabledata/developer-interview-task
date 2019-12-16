import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import config from '../../config/core';

const { serviceDesk } = config;

const Footer = () => {
  return (
    <footer className="govuk-footer " role="contentinfo">
      <div className="govuk-width-container ">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 className="govuk-visually-hidden">Support links</h2>
            <ul className="govuk-footer__inline-list">
              <li className="govuk-footer__inline-list-item">
                <Link className="govuk-footer__link" to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="govuk-footer__inline-list-item">
                <a className="govuk-footer__link" href={`${serviceDesk.support}`} target="_blank" rel="noopener noreferrer">Help</a>
              </li>
            </ul>
          </div>
          <div className="govuk-footer__meta-item">
            <a className="govuk-footer__link govuk-footer__copyright-logo" href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">© Crown copyright</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
