import PubSub from 'pubsub-js';
import React, {Suspense} from 'react';
import SockJS from 'sockjs-client';

import { Client, Message } from '@stomp/stompjs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// local imports
import DataSpinner from '../../../core/components/DataSpinner';
import withLog from '../../../core/error/component/withLog';

const CalendarDashboardPanel = React.lazy(() => import('./CalendarDashboardPanel'));
const MessagesPanel = React.lazy(() => import('./MessagesPanel'));
const ProceduresDashboardPanel = React.lazy(() => import('./FormsDashboardPanel'));
const ReportsDashboardPanel = React.lazy(() => import('./ReportsDashboardPanel'));
const TaskCountPanel = React.lazy(() => import('./TaskCountPanel'));

export class DashboardPanel extends React.Component {
  constructor(props) {
    super(props);
    this.websocketSubscriptions = [];
    this.retryCount = 0;
    this.connect = this.connect.bind(this);
  }

  connect = (user) => {
    const uiEnv = this.props.appConfig.uiEnvironment.toLowerCase();
    this.client = new Client({
      debug: function (str) {
        if (uiEnv === 'development' || uiEnv === 'local') {
            console.log(str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    const self = this;
    this.client.onConnect = function(frame) {
      self.props.log([{
        message: 'Connected to websocket',
        level: 'info',
        path: self.props.location.pathname
      }]);

      const teamSub = self.client.subscribe(`/topic/task/${self.props.shift.get('teamid')}`, (msg) => {
        PubSub.publishSync("refreshCount", {});
      });
      self.websocketSubscriptions.push(teamSub);

      const userSub = self.client.subscribe(`/user/queue/task`, (msg) => {
        PubSub.publishSync("refreshCount", {});
      });
      self.websocketSubscriptions.push(userSub);

      self.props.log([{
        message: 'Number of subscriptions ' + self.websocketSubscriptions.length,
        level: 'info',
        path: self.props.location.pathname
      }]);
    };

    this.client.onStompError = function (frame) {
      self.props.log([{
        message: `Failed to connect ${frame.headers['message']}`,
        level: 'error',
        path: self.props.location.pathname
      }]);
    };
    this.client.activate();
  };

  render() {
    return (
      <div>
        <div className="govuk-grid-row">
          <ul className="govuk-list">
            <TaskCountPanel {...this.props}/>
            <MessagesPanel {...this.props} />
          </ul>
        </div>
        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible"/>
        <div className="govuk-grid-row" style={{paddingTop: '10px'}}>
          <Suspense
            fallback={<div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}><DataSpinner
                message="Loading panels..."/></div>}>
            <ul className="govuk-list">
              <ProceduresDashboardPanel {...this.props}/>
              <ReportsDashboardPanel {...this.props}/>
              <CalendarDashboardPanel {...this.props}/>
            </ul>
          </Suspense>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect((state) => {
  return {
    appConfig: state.appConfig
  }
}, mapDispatchToProps)(withLog(DashboardPanel)));
