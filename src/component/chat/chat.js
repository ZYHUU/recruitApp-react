import React, { Component } from 'react'

class Chat extends Component {
    render() {
        return (
            <div>
                chat{this.props.match.params.user}
            </div>
        )
    }
}
export default Chat