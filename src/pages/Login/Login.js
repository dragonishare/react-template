import React from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import { login } from '../../redux/Modules/Login';
import { Form, Icon, Input, Button } from 'antd';
import Util from '../../services/util.js';

import './Login.less';

const FormItem = Form.Item;

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorTips: false,
      userInfo: {
        email: Util.getUserInfo.email || 'admin' || '',
        password: 'admin' || '',
        isLogin: Util.getUserInfo.isLogin || false
      }
    };
  }

  //处理账号密码输入
  handleChange = e => {
    this.setState({
      userInfo: assign({}, this.state.userInfo, {
        [e.target.name]: e.target.value
      })
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.userInfo.email && this.state.userInfo.password) {
      this.props.dispatch(
        login(this.state.userInfo, res => {
          if (res === 'error') {
            this.setState({
              errorTips: true
            });
          }
        })
      );
    } else {
      this.setState({
        errorTips: true
      });
    }
  };

  render() {
    let isLogin = this.props.login.userInfo.isLogin;

    if (isLogin && this.props.location.pathname === '/login') {
      this.props.history.push('home');
    }

    return (
      <div className="login">
        <div className="login-inner">
          <div className="login-main">
            <div className="login-header">
              <h3 className="title">后台管理</h3>
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="error-tips">
                {this.state.errorTips
                  ? 'You entered an invalid email address or password.'
                  : ''}
              </div>
              <FormItem>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="text"
                  name="email"
                  className="login-form-input"
                  placeholder="Email address"
                  defaultValue={this.state.userInfo.email}
                  onChange={this.handleChange}
                />
              </FormItem>
              <FormItem>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  name="password"
                  className="login-form-input"
                  placeholder="Password"
                  defaultValue={this.state.userInfo.password}
                  onChange={this.handleChange}
                />
              </FormItem>
              <FormItem className="login-form-operation">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  LOGIN
                </Button>
              </FormItem>
              <div className="tips">
                <span>管理员：admin/admin</span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default connect(mapStateToProps)(Login);
