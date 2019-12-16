import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../../core/shift/actions';
import './DashboardTitle.css';
import AppConstants from '../../../common/AppConstants';
import secureLocalStorage from '../../../common/security/SecureLocalStorage';

class DashboardTitle extends React.Component {
  constructor(props) {
    super(props);
    this.endShift = this.endShift.bind(this);
    this.viewShift = this.viewShift.bind(this);
    this.secureLocalStorage = secureLocalStorage;
  }

//   componentDidUpdate() {
//     const { hasActiveShift } = this.props;
// 
//     if (!hasActiveShift) {
//       window.location.reload();
//     }
//   }

  endShift(e) {
    e.preventDefault();
    this.secureLocalStorage.remove('shift');
    this.props.endShift();
  }

  viewShift(e) {
    e.preventDefault();
    const { history } = this.props;
    history.replace(AppConstants.SHIFT_PATH);
  }

  render() {
    const { endingShift, hasActiveShift } = { 'endShift': false, 'hasActiveShift': false };
    const shiftStatus = () => {
      if (hasActiveShift) {
        return (
          <div className="govuk-grid-column-one-half" style={{ margin: '2% auto', textAlign: 'right' }}>
            <div className="shift-button-ul">
              <ul>
                <li>
                  <button
                    id="editShift"
                    className="govuk-button govuk-button--secondaryy"
                    style={{ margin: '0' }}
                    type="submit"
                    onClick={this.viewShift}
                    disabled={endingShift}
                  >Edit shift
                  </button>
                </li>
                <li>
                  <button
                    id="endShift"
                    className="govuk-button govuk-button--warning"
                    data-module="govuk-button"
                    type="submit"
                    onClick={this.endShift}
                    disabled={endingShift}
                    data-prevent-double-click="true"
                  >End shift
                  </button>
                </li>
              </ul>
            </div>
          </div>
        );
      }
      return (
        <div className="govuk-grid-column-one-half" style={{ margin: '7% auto', textAlign: 'right' }}>
          <button id="startShift" className="govuk-button" type="submit" onClick={this.viewShift}>Start shift</button>
        </div>
      );
    };

    return (
      <div className="govuk-grid-row" style={{ paddingTop: '10px' }}>
        <div className="govuk-grid-column-one-half">
          <h1 className="govuk-heading-l">
            <span className="govuk-caption-l"></span>
            Operational dashboard
          </h1>
        </div>
        {shiftStatus()}
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(state => {
  return {
    hasActiveShift: false,
    endingShift: false,
  };
}, mapDispatchToProps)(DashboardTitle));
