import React, { Component } from 'react';
import { List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile'
import Logo from './../../component/logo/logo';
import { connect } from 'react-redux'
import { resisger } from '../../redux/user.redux'

@connect(
    state=>state.user,
    {resisger}
)
class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            type: 'genius',  // or boss
            user: '',
            pwd: '',
            repeatpwd: ''
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key,val) {
        this.setState({
            [key]: val
        })
    }
    handleRegister() {
        this.props.regisger(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                <Logo></Logo>
                <List>
                    <InputItem
                        onChange={v=>this.handleChange('user',v)}
                    >
                    用户
                    </InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v=>this.handleChange('pwd',v)}
                    >
                    密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v=>this.handleChange('repeatpwd',v)}
                    >
                    确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==='genius'}>
                    牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type==='boss'}>
                    BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type="primary">注册</Button>
                </List>
            </div>
        )
    }
}

export default Register