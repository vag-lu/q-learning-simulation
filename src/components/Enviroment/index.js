import React, { Component } from 'react'
import { MATRIX_X, MATRIX_Y, END_STATE, START_STATE, END_REWARD, GENERAL_REWARD } from '../../settings'
import { UP, RIGHT, LEFT, DOWN } from "../../models/actions"
import { MIDLE, 
         DOWN_LEFT_CORNER, 
         UP_RIGHT_CORNER, 
         UP_LEFT_CORNER, 
         RIGHT_LINE,
         LEFT_LINE,
         DOWN_RIGHT_CORNER,
         DOWN_LINE,
         UP_LINE} from "../../models/statesGroups"
import StateOfEnv from '../StateOfEnv'
import './index.css'

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
        let i = 1
        let j = 1
        let count = 2

        this.defineObstacles(totalStates)

        rowData.push({
            x: i,
            y: j,
            isHere: true,
            obstacle: false,
            id: 1,
            actions: [RIGHT, DOWN]
        })

        while (j <= MATRIX_Y) {

            i++

            let state = {
                x: i,
                y: j,
                isHere: false,
                id: count,
                isEnd: false,
                isStart: false,
                reward: GENERAL_REWARD,
                actions: []
            }           

            if (count === END_STATE) {
                state = { ...state, isEnd: true, reward: END_REWARD }
            }

            if (count === START_STATE) {
                state = { ...state, isStart: true }
            }

            if (obstacles.includes(count)) {
                state = { ...state, obstacle: true }
            } else {
                state = {
                    ...this.possibleActionsByState(state, obstacles), obstacle: false
                }
            }

            rowData.push(state)

            if (i === MATRIX_X) {
                i = 0
                j++
                enviromentData.push(rowData)
                rowData = []
            }

            count++
        }
        console.log(enviromentData)
        updateStates(enviromentData)
    }

    possibleActionsByState(state, obstacles) {
        const x = state.x
        const y = state.y
        let actions = [RIGHT, DOWN, LEFT, UP]

        if (x === 1 && y === 1) {
            actions = this.removeActions(actions, [LEFT, UP])
            actions = this.removeActionsToObstacles(UP_LEFT_CORNER, actions, obstacles, state)
        } else if (x === MATRIX_X && y === 1) {
            actions = this.removeActions(actions, [RIGHT, UP])
            actions = this.removeActionsToObstacles(UP_RIGHT_CORNER, actions, obstacles, state)
        } else if (x === MATRIX_X && y === MATRIX_Y) {
            actions = this.removeActions(actions, [RIGHT, DOWN])
            actions = this.removeActionsToObstacles(DOWN_RIGHT_CORNER, actions, obstacles, state)
        } else if (x === 1 && y === MATRIX_Y) {
            actions = this.removeActions(actions, [LEFT, DOWN])
            actions = this.removeActionsToObstacles(DOWN_LEFT_CORNER, actions, obstacles, state)
        } else {
            if (x === 1) {
                actions = this.removeActions(actions, [LEFT])
                actions = this.removeActionsToObstacles(LEFT_LINE, actions, obstacles, state)
            } else if (y === 1) {
                actions = this.removeActions(actions, [UP])
                actions = this.removeActionsToObstacles(UP_LINE, actions, obstacles, state)
            } else if (x === MATRIX_X) {
                actions = this.removeActions(actions, [RIGHT])
                actions = this.removeActionsToObstacles(RIGHT_LINE, actions, obstacles, state)
            } else if (y === MATRIX_Y) {
                actions = this.removeActions(actions, [DOWN])
                actions = this.removeActionsToObstacles(DOWN_LINE, actions, obstacles, state)
            } else {
                actions = this.removeActionsToObstacles(MIDLE, actions, obstacles, state)
            }
        }

        return {...state, actions: actions}
    }

    removeActionsToObstacles(type, actions, obstacles, state) {

        if (type === MIDLE || type === DOWN_RIGHT_CORNER || type === LEFT_LINE || type === RIGHT_LINE || type === DOWN_LINE || type === DOWN_LEFT_CORNER) {
            actions = this.testeIfIncludesOstacle(actions, (state.id - MATRIX_X), UP, obstacles)
        }
        if (type === MIDLE || type === UP_LEFT_CORNER || type === DOWN_LEFT_CORNER || type === LEFT_LINE || type === UP_LINE || type === DOWN_LINE) {
            actions = this.testeIfIncludesOstacle(actions, (state.id + 1), RIGHT, obstacles)
        }
        if (type === MIDLE || type === UP_RIGHT_CORNER || type === UP_LEFT_CORNER || type === UP_LINE || type === RIGHT_LINE || type === LEFT_LINE) {
            actions = this.testeIfIncludesOstacle(actions, (state.id + MATRIX_X), DOWN, obstacles)
        }
        if (type === MIDLE || type === UP_RIGHT_CORNER || type === DOWN_RIGHT_CORNER || type === UP_LINE || type === DOWN_LINE || type === RIGHT_LINE) {
            actions = this.testeIfIncludesOstacle(actions, (state.id - 1), LEFT, obstacles)
        }

        return actions
    }

    removeActions(actions, actionsToRemove) {
        for (let i = 0; i < actionsToRemove.length; i++) {
            actions.splice(actions.indexOf(actionsToRemove[i]), 1)
        }
        return actions
    }

    testeIfIncludesOstacle(actions, idToVerify, toRemove, obstacles) {
        if (obstacles.includes(idToVerify)) {
            actions.splice(actions.indexOf(toRemove), 1)
        }
        return actions
    }

    createEnviroment() {
        const { states } = this.props
        return (
            states.map(row => (
                <tr>
                    {this.createRow(row)}
                </tr>
            ))
        )
    }

    createRow(row) {
        const {
            qTable
        } = this.props

        return row.map(state => (
            <StateOfEnv cel={state} qState={qTable[state.id - 1]} />
        ))
    }

    defineObstacles(totalStates) {
        const {
            obstacles,
            includeObstacle
        } = this.props
        const percOfObstacles = Math.floor((Math.random() * (25 - 10 + 1)) + 10);
        const numberOfObstacle = Math.round((percOfObstacles / 100) * totalStates)

        for (let i = 1; i <= numberOfObstacle; i++) {
            let stateWithObstacle = Math.floor((Math.random() * totalStates - 2)) + 2

            while (obstacles.includes(stateWithObstacle)) {
                stateWithObstacle = Math.floor((Math.random() * totalStates - 2)) + 2
            }

            includeObstacle(stateWithObstacle)
        }
    }

    render() {
        return (
            <div>
                <table className='tbl'>
                    {this.createEnviroment()}
                </table>
            </div>
        )
    }
}