import React from 'react';
import { connect } from 'react-redux';

import './DeviceVersion.less';

const mapStateToProps = state => {
  return {
    deviceVersion: state.deviceVersion
  };
};

class DeviceVersion extends React.Component {
  render() {
    return <div className="content-wrapper">deviceVersion</div>;
  }
}

export default connect(mapStateToProps)(DeviceVersion);
