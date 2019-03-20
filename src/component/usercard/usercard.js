import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
@withRouter
class UserCard extends Component{
    static protype = {
        userlist: PropTypes.array.isRequired
    }
    handelClick(v) {
        this.props.history.push(`/chat/${v}`)
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    v.avatar?
                        (<Card
                            key={v._id}
                            onClick={() => this.handelClick(v.user)}>
                            <Header
                                title={v.user}
                                thumb={require(`../../assets/img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >
                            </Header>
                            <Body>
                            {v.type == 'boss' ? <div>公司:{v.company}</div>:null}
                                {v.desc.split('\n').map(d => (
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type == 'boss' ? <div>薪资:{v.money}</div>:null}
                            </Body>
                        </Card>)
                    : null
                ))}
            </WingBlank>
        )
    }
}
export default UserCard