import React from 'react'

export default class State {
    render(){
        const {
            state
        } = this.props
        return(
            <div>
                <td className={state.obstacle ? `obstacle` : `state`}>
                </td>
            </div>
        )
    }
}