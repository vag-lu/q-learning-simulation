import React, { Component } from 'react'
import { MATRIX_X, MATRIX_Y } from '../../settings'

export default class Enviroment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            enviroment: []
        }
    }

    componentWillMount() {
        this.defineEnviroment()
    }

    defineEnviroment() {
        const {
            obstacles
        } = this.props
        const totalStates = MATRIX_X * MATRIX_Y
        let enviromentData = []
        this.defineObstacles(totalStates)
        console.log(obstacles)
        let i = 1
        let j = 1
        let cont = 1

        while (cont <= totalStates) {
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

            enviromentData.push(state)

            if (i === MATRIX_X) {
                i = 1
                j++
            }
            i++
            cont++
        }
        console.log(enviromentData)
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

            </div>
        )
    }
}