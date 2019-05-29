import React, { Component } from 'react'
import './index.css'

export default class StateOfEnv extends Component {
    render() {
        const {
            state
        } = this.props
        
        return (
            <td className={`td ${state.obstacle ? `obstacle` : `state`}`}></td>
        )
    }
}