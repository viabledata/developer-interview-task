import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// local imports
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './Main';
import config from '../config/core';
import withLog from './error/component/withLog';

const { serviceDesk } = config;

export class App extends React.Component {
  componentDidMount() {
    const { location, log } = this.props;
    log(
      [
        {
          level: 'info',
          path: location.pathname,
          message: `Route requested ${location.pathname}`,
        },
      ],
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="govuk-width-container" style={{ height: '100%' }}>
          <AppBanner {...this.props} />
          <Main />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

// does this add some indication that you're on a non production environment?
const AppBanner = props => {
  const { appConfig } = props;
  const environment = () => {
    if (appConfig.uiEnvironment.toLowerCase() !== 'production') {
      return (
        <span>
          <strong className="govuk-tag govuk-phase-banner__content__tag ">
            {appConfig.uiEnvironment}
          </strong>
        </span>
      );
    }
    return null;
  };

  return (
    <div className="govuk-phase-banner">
      <p className="govuk-phase-banner__content">
        <strong className="govuk-tag govuk-phase-banner__content__tag ">
          {appConfig.uiVersion}
        </strong>
        {environment()}
        <span className="govuk-phase-banner__text">
          This is a new service – your <a className="govuk-link" href={`${serviceDesk.feedback}`} target="_blank" rel="noopener noreferrer">feedback</a> will help us to improve it.
        </span>
      </p>
    </div>
  );
};

App.propTypes = {
  log: PropTypes.func,
  location: PropTypes.object,
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(state => ({
  appConfig: state.appConfig,
}), mapDispatchToProps)(withLog(App)));
