import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
class NavLinkBar extends Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v=>!v.hide)
        const { pathname } = this.props.location
        
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{ uri: require(`../../assets/img/${v.icon}.png`) }}
                       
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    >
                     {/*selectedIcon={{uri: require(`../../assets/img/${v.icon}-active.png`)}}*/}
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}
export default NavLinkBar