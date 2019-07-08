import React, { Component } from 'react'
import './App.css'
import Enviroment from '../../components/Enviroment'
import EviromentToolbar from '../../components/EviromentToolbar'
import { MATRIX_X, MATRIX_Y, ALPHA, GAMMA, EPSILON } from '../../settings'
import MenuDrawer from '../../components/MenuDrawer'
import QLearning from '../../qlearning/qlearning'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qTable: [],
      statesTable: [],
      obstacles: [],
      openMenu: false,
      alpha: ALPHA,
      gamma: GAMMA,
      epsilon: EPSILON,
      start: false,
      stop: true,
    }
    this.includeObstacle = this.includeObstacle.bind(this)
    this.updateStates = this.updateStates.bind(this)
    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleCloseMenu = this.handleCloseMenu.bind(this)
    this.handleAlphaChange = this.handleAlphaChange.bind(this)
    this.handleGammaChange = this.handleGammaChange.bind(this)
  }

  handleOpenMenu() {
    this.setState({ openMenu: true })
  }

  handleCloseMenu() {
    this.setState({ openMenu: false })
  }

  handleAlphaChange(alpha) {
    this.setState({ alpha })
  }

  handleGammaChange(gamma) {
    this.setState({ gamma })
  }

  handleStart = () => {
    this.setState({ start: true, stop: false })
  }

  handleStop = () => {
    this.setState({ start: false, stop: true })
  }

  componentDidMount() {
    this.initializeQTable()
  }

  setQTable = (qTable) => {
    this.setState({ qTable: qTable })
  }

  setStatesTable = (newStatesTable) => {
    this.setState({statesTable: newStatesTable})
  }

  includeObstacle(newObstacle) {
    let newArrayObstacles = this.state.obstacles
    newArrayObstacles.push(newObstacle)
    this.setState({ obstacles: newArrayObstacles })
  }

  initializeQTable() {
    let initQTable = []
    const tabLength = MATRIX_X * MATRIX_Y

    for (let i = 0; i < tabLength; i++) {
      initQTable.push({
        actions: {
          0: 0,
          1: 0,
          2: 0,
          3: 0
        },
        state: i + 1,
      })
    }

    this.setQTable(initQTable)
    console.log(initQTable)
  }

  updateStates(statesTable) {
    this.setState({ statesTable })
  }

  render() {
    const {
      obstacles,
      statesTable,
      qTable,
      openMenu,
      alpha,
      gamma,
      start,
      epsilon,
      stop,
    } = this.state

    return (
      <div>
        <div>
          <EviromentToolbar
            handleOpenMenu={this.handleOpenMenu}
            handleStart={this.handleStart}
            handleStop={this.handleStop}
            start={start} />
          <MenuDrawer
            openMenu={openMenu}
            alpha={alpha}
            gamma={gamma}
            handleAlphaChange={this.handleAlphaChange}
            handleGammaChange={this.handleGammaChange}
            handleCloseMenu={this.handleCloseMenu}
            handleOpenMenu={this.handleOpenMenu} />
        </div>
        <div>
          <Enviroment
            obstacles={obstacles}
            states={statesTable}
            updateStates={this.updateStates}
            includeObstacle={this.includeObstacle}
            qTable={qTable}
          />
        </div>
        {start && <QLearning
          qTable={qTable}
          stop={stop}
          statesTable={statesTable}
          alpha={alpha}
          gamma={gamma}
          epsilon={epsilon}
          setQTable={this.setQTable} 
          setStatesTable={this.setStatesTable}/>}
      </div>
    )
  }
}

