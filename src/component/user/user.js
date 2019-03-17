import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile'
import browserCookie from 'browser-cookies'
@connect(
    state => state.user
    
)
class User extends Component{
    constructor(props) {
        super(props)
        this.state = {

        }
        // this.logout = this.logout.bind(this)
    }
    logout() {
        // 删除cookie
        console.log('logout')
        browserCookie.erase('userid')
        window.location.href = window.location.href;
    }
    handelClick = () => {
        debugger
        console.log('1111')
    }
    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief
        return props.user?(
            <div onClick={this.handelClick}>
                <Result
                    img={<img src={require(`../../assets/img/${props.avatar}.png`)} style={{width: '50px'}} alt="" />}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资:{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>    
                <Button type="primary" onClick={() => this.logout()}>退出登录</Button>
            </div>
        ):null
    }
}
export default User