import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank} from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
    state => state.chatuser,
    {getUserList}
)
class Boss extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        this.props.getUserList('genius')
        axios.get('/user/list?type='+type)
        .then(res => {
            if (res.data.code === 0) {
                console.log(res.data.data)
           dispatch(userList(res.data.data))
        }
    })
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body
        console.log(this.props)
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    v.avatar?
                        (<Card key={v._id}>
                            <Header
                                title={v.user}
                                thumb={require(`../../assets/img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >
                            </Header>
                            <Body>
                                {v.desc.split('\n').map(v => (
                                    <div key={v}>{v}</div>
                                ))}
                            </Body>
                        </Card>)
                    : null
                ))}
            </WingBlank>
        )
    }
}

export default Boss