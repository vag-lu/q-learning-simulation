import React, { Component } from 'react'
import { MATRIX_X, MATRIX_Y } from '../../settings'
import State from '../State';

export default class Enviroment extends Component {

    componentWillMount() {
        this.defineEnviroment()
    }

    defineEnviroment() {
        const {
            obstacles,
            updateStates
        } = this.props
        const totalStates = MATRIX_X * MATRIX_Y
        let enviromentData = []
        let rowData = []
        this.defineObstacles(totalStates)
        //console.log(obstacles)
        let i = 1
        let j = 1
        let cont = 1
        console.log(totalStates)

        while (j <= MATRIX_Y) {
            let state = {
                x: { i },
                y: { j }
            }

            if (obstacles.includes(cont)) {
                state = { ...state, obstacle: true }
            } else {
                state = {
                    ...state, obstacle: false
                }
            }

            rowData.push(state)

            if (i === MATRIX_X) {
                i = 1
                j++
                enviromentData.push(rowData)
                rowData = []
            }
            i++
            cont++
        }
        console.log(enviromentData)
        updateStates(enviromentData)
    }

    createEnviroment() {
        debugger
        const { states } = this.props
        return (
            states.map(row => {
                return (
                    <tr>
                        {this.createRow(row)}
                    </tr>
                )
            })
        )
    }

    createRow(row) {
        row.map(state => (
            <State state={state} />
        ))
    }

    defineObstacles(totalStates) {
        const {
            obstacles,
            includeObstacle
        } = this.props
        const percOfObstacles = Math.floor((Math.random() * (50 - 30 + 1)) + 30);
        const numberOfObstacle = Math.round((percOfObstacles / 100) * totalStates)

        for (let i = 1; i <= numberOfObstacle; i++) {
            let stateWithObstacle = Math.floor((Math.random() * totalStates)) + 1

            while (obstacles.includes(stateWithObstacle)) {
                stateWithObstacle = Math.floor((Math.random() * totalStates)) + 1
            }

            includeObstacle(stateWithObstacle)
        }
    }

    render() {
        return (
            <div>
                <table>
                    {this.createEnviroment()}
                </table>
            </div>
        )
    }
}