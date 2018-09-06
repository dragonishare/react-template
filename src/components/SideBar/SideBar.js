import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import menuConfig from '../../common/Menu';
import './SideBar.less';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class SideBar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  componentWillMount() {
    const menuTreeNode = this.renderMenu(menuConfig);

    this.setState({
      menuTreeNode
    });
  }

  // 菜单渲染
  renderMenu(items) {
    return items.map((menuItem, index) => {
      if (menuItem.children) {
        return (
          <SubMenu
            key={menuItem.key}
            title={
              <span>
                <Icon type={menuItem.icon} />
                <span>{menuItem.title}</span>
              </span>
            }
          >
            {this.renderMenu(menuItem.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={menuItem.key}>
          <NavLink to={menuItem.key}>
            {menuItem.icon && <Icon type={menuItem.icon} />}
            <span>{menuItem.title}</span>
          </NavLink>
        </Menu.Item>
      );
    });
  }

  render() {
    const { location, currentUser } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        className="sidebar"
      >
        <div className="logo">后台管理系统</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={[]}
          theme="dark"
        >
          {this.state.menuTreeNode}
          {/* <Menu.Item key="/home">
            <NavLink to="/home">
              <Icon type="home" />
              <span>首页</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/user">
            <NavLink to="/user">
              <Icon type="user" />
              <span>用户管理</span>
            </NavLink>
          </Menu.Item>
          <SubMenu
            key="device"
            title={
              <span>
                <Icon type="desktop" />
                <span>设备管理</span>
              </span>
            }
          >
            <Menu.Item key="/device/list">
              <NavLink to="/device/list">
                <span>设备列表</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/device/distribution">
              <NavLink to="/device/distribution">
                <span>设备分布</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/device/version">
              <NavLink to="/device/version">
                <span>设备版本</span>
              </NavLink>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideBar);
