import React, { Component } from 'react'
import './App.css'
import Enviroment from '../../components/Enviroment'
import EviromentToolbar from '../../components/EviromentToolbar'
import { MATRIX_X, MATRIX_Y } from '../../settings';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qTable: [],
      states: [],
      obstacles: []
    }
    this.includeObstacle = this.includeObstacle.bind(this)
    this.updateStates = this.updateStates.bind(this)
  }

  componentDidMount() {
    this.initializeQTable()
  }

  setQTable(qTable) {
    this.setState({ qTable: qTable })
  }

  includeObstacle(newObstacle) {
    let newArrayObstacles = this.state.obstacles
    newArrayObstacles.push(newObstacle)
    this.setState({ obstacles: newArrayObstacles })
  }

  initializeQTable() {
    let initQTable = []
    const tabLength = MATRIX_X * MATRIX_Y

    for (let i = 0 ; i<tabLength ;  i++) {
      initQTable.push({
        state: i+1,
        up: 0,
        down: 0,
        left: 0,
        right:0
      })
    }

    this.setQTable(initQTable)
  }

  updateStates(states) {
    this.setState({ states: states })
  }

  render() {
    const {
      obstacles,
      states,
      qTable
    } = this.state
    return (
      <div>
        <div>
          <EviromentToolbar />
        </div>
        <div>
          <Enviroment
            obstacles={obstacles}
            states={states}
            updateStates={this.updateStates}
            includeObstacle={this.includeObstacle}
            qTable={qTable}
          />
        </div>
      </div>
    )
  }
}

