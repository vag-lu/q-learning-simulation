import React, { Component } from 'react'
import Tooltip from 'react-simple-tooltip'
import './index.css'
import { MATRIX_X } from '../../settings';

export default class StateOfEnv extends Component {
    render() {
        const {
            cel,
            qState
        } = this.props
        
        const half = MATRIX_X / 2

        return (
            
            <td className={`td ${cel.obstacle ? 'obstacle' : cel.isHere ? 'isHere' : 
                            cel.isStart ? 'isStart' : cel.isEnd ? 'isEnd' : 'state'}`}>
                <Tooltip content={JSON.stringify(qState)} placement={(cel.x / half) <= 1 ? 'right' : 'left'}>
                    {cel.id}
                </Tooltip>
            </td >
        )
    }
}