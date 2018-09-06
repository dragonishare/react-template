import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import SideBar from '../../components/SideBar/SideBar';
import { logout } from '../../redux/Modules/Login';
import './Authorized.less';
import { getUserInfo } from '../../services/util';

const { Content, Footer } = Layout;

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

class Authorized extends React.Component {
  handleHeaderMenuClick = () => {
    this.props.dispatch(logout());
  };

  handleHeaderMenuClick = () => {
    this.props.dispatch(logout());
  };

  render() {
    let isLogin = this.props.login.userInfo.isLogin;
    // let userInfo = this.props.login.userInfo;
    let userInfo = getUserInfo() || this.props.login.userInfo;
    if (!isLogin) {
      return <Redirect to="/login" />;
    } else if (this.props.location.pathname === '/') {
      return <Redirect to="/home" />;
    }

    return (
      <Layout className="authorized-layout">
        <SideBar currentUser={userInfo} />
        <Layout className="layout-main">
          <LayoutHeader
            onMenuClick={this.handleHeaderMenuClick}
            currentUser={userInfo}
          />
          <Content className="layout-main-content">
            {this.props.children}
          </Content>
          <Footer className="layout-footer">
            Anker Innovations Technology Ltd ©
            2018（推荐使用谷歌浏览器，可以获得更佳操作页面体验）
            技术支持：soft-dev2
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(Authorized);
