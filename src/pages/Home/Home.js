import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { getUsers } from '../../redux/Modules/User';

import './Home.less';

const mapStateToProps = state => {
  return {
    home: state.home,
    login: state.login
  };
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryList: {
        email: this.props.login.userInfo.email,
        nick_name: this.props.login.userInfo.nick_name,
        num: 15,
        page: 0
      }
    };
  }

  componentWillMount() {
    this.props.dispatch(getUsers(this.state.query));
  }

  render() {
    return <div className="home content-wrapper">home</div>;
  }
}

export default connect(mapStateToProps)(Home);
