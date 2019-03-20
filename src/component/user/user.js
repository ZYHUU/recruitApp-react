import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends Component{
    constructor(props) {
        super(props)
        this.state = {

        }
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert
        alert('注销', '确认退出登录吗？？', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确认', onPress: () => {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            }}
        ])
        // 删除cookie
        console.log('logout')
        // browserCookie.erase('userid')
        // window.location.href = window.location.href;
    }
  
    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief
        return props.user ? (
            <div style={{"height": "10%"}}>    
                <Result
                    img={<img src={require(`../../assets/img/${props.avatar}.png`)} alt="" />}
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
        ): <Redirect to={this.props.redirectTo} />
    }
}
export default User