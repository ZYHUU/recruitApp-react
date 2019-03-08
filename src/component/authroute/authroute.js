import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
@withRouter
@connect(
    null,
    { loadData }
)
class AuthRoute extends Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        // 获取用户信息
        axios.get('/user/info')
        .then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 有登录信息
                    this.props.loadData(res.data.data)
                } else {
                    // 无登录信息
                    this.props.history.push('/login')
                }
            }
        })
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}

export default AuthRoute