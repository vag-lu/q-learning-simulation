import React, { Component } from 'react'
import { MATRIX_X, MATRIX_Y, END_STATE, START_STATE } from '../../settings'
import StateOfEnv from '../StateOfEnv';
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
        })

        while (j <= MATRIX_Y) {

            i++

            let state = {
                x: i,
                y: j,
                isHere: false,
                id: count,
                isEnd: false,
                isStart: false
            }

            if(count === END_STATE) {
                state = { ...state, isEnd: true } 
            }

            if(count === START_STATE) {
                state = { ...state, isStart: true } 
            }

            if (obstacles.includes(count)) {
                state = { ...state, obstacle: true }
            } else {
                state = {
                    ...state, obstacle: false
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
            <StateOfEnv cel={state} qState={qTable[state.id - 1]}/>
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