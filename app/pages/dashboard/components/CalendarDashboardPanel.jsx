import React from 'react';
import {withRouter} from "react-router";
import AppConstants from "../../../common/AppConstants";

export class CalendarDashboardPanel extends React.Component {


    calendar(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: AppConstants.DASHBOARD_PATH,
            shiftPresent: this.props.hasActiveShift
        });
    }
    render() {
        return <li className="__card govuk-grid-column-one-third" id="calendarPanel" style={{marginBottom: '30px'}}>
            <a href={AppConstants.DASHBOARD_PATH} className="card__body" id="calendarPageLink" style={{color: '#005ea5'}} onClick={this.calendar.bind(this)}>
                <span className="govuk-!-font-size-36 govuk-!-font-weight-bold">Calendar</span>
            </a>
            <div className="card__footer">
                <span className="govuk-!-font-size-19">Coming soon</span>
            </div>
        </li>
    }
}

export default withRouter(CalendarDashboardPanel);
