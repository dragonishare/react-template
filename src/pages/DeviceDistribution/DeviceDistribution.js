import React from 'react';
import { connect } from 'react-redux';

import './DeviceDistribution.less';

const mapStateToProps = state => {
  return {
    deviceDistribution: state.deviceDistribution
  };
};

class DeviceDistribution extends React.Component {
  render() {
    return <div className="content-wrapper">deviceDistribution</div>;
  }
}

export default connect(mapStateToProps)(DeviceDistribution);
