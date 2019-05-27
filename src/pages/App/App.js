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
  }

  setQTable(qTable) {
    this.setState({ qTable: qTable })
  }

  includeObstacle(newObstacle) {
    const newArrayObstacles = this.state.obstacles.push(newObstacle)
    this.setState({ obstacles: newArrayObstacles })
  }

  render() {
    return (
      <div>
        <Enviroment
          obstacles={this.state.obstacles}
          includeObstacle={this.includeObstacle}
        />
      </div>
    )
  }
}

