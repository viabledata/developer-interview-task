import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class withLog extends React.Component {
    render() {
      return <ComposedComponent {...this.props} log={this.props.log} />
    }
  }

  withLog.propTypes = {
    log: PropTypes.func,
  };

  const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
  const mapStateToProps = state => ({});
  return connect(mapStateToProps, mapDispatchToProps)(withLog);
};
