import React, { Component } from 'react'
import './App.css'
import Enviroment from '../../components/Enviroment'

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

  setQTable(qTable) {
    this.setState({ qTable: qTable })
  }

  includeObstacle(newObstacle) {
    let newArrayObstacles = this.state.obstacles
    newArrayObstacles.push(newObstacle)
    this.setState({ obstacles: newArrayObstacles })
  }

  updateStates(states){
    this.setState({states: states})
  }

  render() {
    const {
      obstacles,
      states
    } = this.state
    return (
      <div>
        <Enviroment
          obstacles={obstacles}
          states={states}
          updateStates={this.updateStates}
          includeObstacle={this.includeObstacle}
        />
      </div>
    )
  }
}

