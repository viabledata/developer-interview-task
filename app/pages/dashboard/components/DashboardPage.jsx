import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// local imports
import "./Dashboard.scss";
import DashboardTitle from './DashboardTitle';
import DashboardPanel from './DashboardPanel';

export class DashboardPage extends React.Component {

    render() {
        return (
          <div id="dashboardContent">
            <DashboardTitle {...this.props} />
            <DashboardPanel {...this.props}/>
          </div>
        )
    }
}

DashboardPage.propTypes = {
    shift: ImmutablePropTypes.map
};

export default withRouter(connect((state) => {
    return {
    }
})(DashboardPage))
