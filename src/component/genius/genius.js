import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank} from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard  from '../../component/usercard/usercard'
@connect(
    state => state.chatuser,
    {getUserList}
)
class Genius extends Component{
    componentDidMount() {
        this.props.getUserList('boss')
    }
    render() {
        return (
            <UserCard userlist={this.props.userlist}></UserCard>
        )
    }
}

export default Genius