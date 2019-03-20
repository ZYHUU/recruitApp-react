import React, { Component } from 'react';
import Logo from './../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { login } from '../../redux/user.redux'
import commForm from '../../component/commForm/commForm'
@connect(
    state => state.user,
    { login }
)
@commForm
class Login extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this)
        this.handelLogin = this.handelLogin.bind(this)
    }

    register() {
        this.props.history.push('/register')
    }

    // 登录
    handelLogin() {
        this.props.login(this.props.state)
    }

    render() {
        return (
            <div>
                {/* 如果存在跳转路径，跳转到相应页面 */}
                {this.props.redirectTo && this.props.redirectTo !== '/login'? (
                    <Redirect to={this.props.redirectTo} />
                ) : null}
                <Logo></Logo>
                <h1>login</h1>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="err_msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props.handleChange("user", v)}
                        >用户</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange("pwd", v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button
                        type="primary"
                        onClick={this.handelLogin}
                    >登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )


    }
}

export default Login