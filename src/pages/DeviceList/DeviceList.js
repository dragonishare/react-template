import React from 'react';
import { connect } from 'react-redux';

import './DeviceList.less';

const mapStateToProps = state => {
  return {
    deviceList: state.deviceList
  };
};

class DeviceList extends React.Component {
  render() {
    return <div className="content-wrapper">deviceList</div>;
  }
}

export default connect(mapStateToProps)(DeviceList);
