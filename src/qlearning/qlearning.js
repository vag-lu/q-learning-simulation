import { UP, RIGHT, LEFT, DOWN } from "../models/actions"

export default function QLearning(props) {

    const {
        qTable,
        setQTable,
        alpha,
        gamma,
        epsilon,
        statesTable,
        setStatesTable
    } = props

    let newQTable = qTable
    let actionToTake
    let actualState = findIsHereState(statesTable)
    //let interaction = 1     
    //while (interaction <= 100) {

    if (Math.random() < epsilon) {
        actionToTake = exploredNextAction(actualState)
    } else {
        actionToTake = exploitedNextAction(actualState, newQTable)
    }

    let nextState = stateAfterMove(actionToTake, actualState, statesTable)

    newQTable[actualState.id - 1][actionToTake] = newQTable[actualState.id - 1][actionToTake] +
        alpha * (nextState.reward + gamma * maxQAction(nextState, newQTable) -
            newQTable[actualState.id - 1][actionToTake])

    statesTable[actualState.y - 1][actualState.x - 1] = { ...actualState, isHere: false }
    statesTable[nextState.y - 1][nextState.x - 1] = { ...nextState, isHere: true }

    setStatesTable(statesTable)
    //interaction++
    //}

    setQTable(newQTable)
    console.log(qTable)
    console.log(newQTable)
}
// qLearning() {        
// }

function findIsHereState(stateArray) {
    let isHereState
    stateArray.find(row => (
        isHereState = row.find(state => (
            state.isHere
        ))
    ))

    return isHereState
}

function maxQAction(state, qTable) {

    let biggerAction = qTable[state.id - 1].actions[randomArrayObj(state.actions)]

    for (let i = 0; i < state.actions.length; i++) {
        if (biggerAction < qTable[state.id - 1].actions[state.actions[i]]) {
            biggerAction = qTable[state.id - 1].actions[state.actions[i]]
        }
    }

    return biggerAction
}

function exploredNextAction(actualState) {
    return randomArrayObj(actualState.actions)
}

function exploitedNextAction(actualState, qTable) {
    const firstActionIndex = randomArrayObj(actualState.actions)
    let biggerAction = qTable[actualState.id - 1].actions[firstActionIndex]
    let biggerActionIndex = firstActionIndex

    for (let i = 0; i < actualState.actions.length; i++) {
        if (biggerAction < qTable[actualState.id - 1].actions[actualState.actions[i]]) {
            biggerAction = qTable[actualState.id - 1].actions[actualState.actions[i]]
            biggerActionIndex = actualState.actions[i]
        }
    }

    return biggerActionIndex
}

function stateAfterMove(movement, actualState, stateTable) {
    let next_x = actualState.x
    let next_y = actualState.y

    switch (movement) {
        case UP:
            next_y--
            break
        case RIGHT:
            next_x++
            break
        case LEFT:
            next_x--
            break
        case DOWN:
            next_y++
            break
        default:
            break
    }

    return stateTable[next_y - 1][next_x - 1]
}

function randomArrayObj(array) {
    return array[Math.floor(Math.random() * (array.length))]
}


