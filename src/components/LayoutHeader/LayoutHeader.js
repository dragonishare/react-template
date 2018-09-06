import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Icon, Breadcrumb } from 'antd';
import './LayoutHeader.less';
const { Header } = Layout;

class LayoutHeader extends React.Component {
  render() {
    const { currentUser, onMenuClick, location } = this.props;

    return (
      <Header className="layout-header">
        <Breadcrumb className="layout-header-left">
          <Breadcrumb.Item>
            <Icon type="home" />
            <Link to="/home"> Home</Link>
          </Breadcrumb.Item>
          {location.pathname.slice(1) !== 'home' ? (
            <Breadcrumb.Item>
              <span>{location.pathname.slice(1)}</span>
            </Breadcrumb.Item>
          ) : (
            ''
          )}
        </Breadcrumb>
        <div className="layout-header-right">
          <div className="nickname">
            <span>
              欢迎，
              {currentUser.role
                ? `${currentUser.nick_name}（ ${currentUser.role} ）`
                : currentUser.role}
            </span>
          </div>
          <div className="logout" onClick={onMenuClick}>
            <Icon type="logout" /> 注销
          </div>
        </div>
      </Header>
    );
  }
}

export default withRouter(LayoutHeader);
