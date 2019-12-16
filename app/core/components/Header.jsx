import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// local imports
import AppConstants from "../../common/AppConstants";
import config from '../../config/core';
import secureLocalStorage from '../../common/security/SecureLocalStorage';

const { serviceDesk } = config;

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.secureLocalStorage = secureLocalStorage;
        this.dashboard = this.dashboard.bind(this);
    }

    dashboard(event) {
        event.preventDefault();
        this.props.history.push(AppConstants.DASHBOARD_PATH);
    }

    render() {
        return <header className="govuk-header" role="banner" data-module="header">
                <div className="govuk-header__container govuk-width-container">
                    <div className="govuk-header__content" style={{width: '100%'}}>
                        <div className="govuk-grid-row">
                            <div className="govuk-grid-column-one-half">
                                <a
                                    id="dashboard"
                                    href={AppConstants.DASHBOARD_PATH}
                                    onClick={event => this.dashboard(event)}
                                    className="govuk-header__link govuk-header__link--service-name"
                                >Central Operations Platform</a>
                            </div>
                            <div className="govuk-grid-column-one-half header-nav">
                                <a
                                    id="profile"
                                    href="#"
                                    className="govuk-header__link header-nav__link"
                                >My profile</a>
                                <a
                                    id="support"
                                    className="govuk-header__link header-nav__link"
                                    href={`${serviceDesk.support}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Support</a>
                                <a
                                    id="logout"
                                    href="#"
                                    className="govuk-header__link header-nav__link"
                                >Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>;
    }
}

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(state => ({
    appConfig: state.appConfig,
}), mapDispatchToProps)(Header));
