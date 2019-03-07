import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
@withRouter
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
                    } else {
                        // 无登录信息
                        // console.log(this.props.history)
                        this.props.history.push('/login')
                    }
                        // console.log(res.data)
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