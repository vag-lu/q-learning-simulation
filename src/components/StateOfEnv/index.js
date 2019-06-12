import React, { Component } from 'react'
import './index.css'

export default class StateOfEnv extends Component {
    render() {
        const {
            cel
        } = this.props
        
        return (
            <td className={`td ${cel.obstacle ? 'obstacle' : cel.isHere ? 'isHere' : 'state'}`}></td>
        )
    }
}