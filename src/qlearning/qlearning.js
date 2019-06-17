import React, { Component } from "react"
import { UP, RIGHT, LEFT, DOWN } from "../models/actions"

export default class QLearning extends Component {

    componentDidMount() {
        this.qLearning()
    }

    qLearning() {
        const {
            stop,
            qTable,
            setQTable,
            alfa,
            gamma,
            epsilon,
            statesTable,
        } = this.props

        let newQTable = qTable
        let actionToTake
        let actualState = this.findIsHereState(statesTable)
        let nextState
        
        while (!stop) {

            if (Math.random() < epsilon) {
                actionToTake = this.exploredNextAction(actualState)
            } else {
                actionToTake = this.exploitedNextAction(actualState, newQTable, statesTable)
            }

            nextState = this.stateAfterMove(actionToTake, actualState, statesTable)
            debugger
            //Q[state, action] = Q[state, action] + lr * (reward + gamma * np.max(Q[new_state, :]) — Q[state, action]
            
        }
    }

    findIsHereState(stateArray) {
        let isHereState
        stateArray.find(row => (
           isHereState =  row.find(state => (
                state.isHere
            ))
        ))

        return isHereState
    }
    
    exploredNextAction(actualState) {
        return this.randomArrayObj(actualState.actions)
    }
    
    exploitedNextAction(actualState, qTable, statesTable) {
        
        let biggerAction = qTable[actualState.id - 1].actions[actualState.actions[0]]
        let biggerActionIndex = 0
        debugger
        for(let i=1 ; i < actualState.actions.length ; i++) {
            if(biggerAction < qTable[actualState.id - 1].actions[actualState.actions[i]]) {
                biggerAction = qTable[actualState.id - 1].actions[actualState.actions[i]]
                biggerActionIndex = actualState.actions[i]
            }
        }

        return biggerActionIndex    
    }
    
    stateAfterMove(movement, actualState, stateTable) {
        let next_x = actualState.x
        let next_y = actualState.y
    
        switch (movement) {
            case UP:
                next_x++
                break
            case RIGHT:
                next_y++
                break
            case LEFT:
                next_x--
                break
            case DOWN:
                next_y--
                break
            default:
                break
        }
        
        return stateTable[next_y - 1][next_x - 1]
    }
    
    randomArrayObj(array) {
        return array[Math.floor(Math.random() * (array.length))]
    }

    render() {
        return null
    }
}

