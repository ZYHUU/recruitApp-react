import React, { Component } from 'react'
import { List, InputItem } from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093/socket.io', {
  transports: ['websocket']
})
socket.on('connect',function(){
    console.log('connected')
})
class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            text: ''
        }
    }
    componentDidMount() {
       
    }
    handelSubmit() {
        socket.emit('sendmsg',{text:this.state.text})
        this.setState({text:''})
        console.log(this.state)
    }
    render() {
        return (
            <div className="stick-footer">
            <List>
                <InputItem
                    placeholder="请输入"
                    value={this.state.text}
                    onChange={v=>{
                        this.setState({text:v})
                    }}
                    extra={<span onClick={() =>this.handelSubmit()}>发送</span>}
                ></InputItem>
            </List>
                chat{this.props.match.params.user}
            </div>
        )
    }
}
export default Chat