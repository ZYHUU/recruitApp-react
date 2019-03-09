import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../../component/navlinkbar/navlinkbar'
function Boss() {
    return <h2>boss</h2>
}
function Genius() {
    return <h2>Genius</h2>
}
function Msg() {
    return <h2>Msg</h2>
}
function User() {
    return <h2>user</h2>
}
@connect(
    state=>state
)
class Dashboard extends Component{
    
   
   
    render() {     
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'man',
                title: '牛人列表',
                component: Boss,
                hide: user.type==='genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'woman',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type==='boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'girl',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'boy',
                title: '个人中心',
                component: User
            }
        ]
        return (
            <div>
                <NavBar mode="dard">
                    {navList.find(v=>v.path===pathname).title}
                </NavBar>
                <h2>content</h2>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard