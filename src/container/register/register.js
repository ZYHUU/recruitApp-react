import React, { Component } from 'react';
import { List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile'
import Logo from './../../component/logo/logo';

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            type: 'genius'  // or boss
        }
    }
    render() {
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                <Logo></Logo>
                <List>
                    <InputItem>用户</InputItem>
                    <WhiteSpace/>
                    <InputItem>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem>确认密码</InputItem>
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