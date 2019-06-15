import React, { Component } from 'react'
import './App.css'
import Enviroment from '../../components/Enviroment'
import EviromentToolbar from '../../components/EviromentToolbar'
import { MATRIX_X, MATRIX_Y, ALPHA, GAMMA} from '../../settings';
import MenuDrawer from '../../components/MenuDrawer';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qTable: [],
      states: [],
      obstacles: [],
      openMenu: false,
      alpha: ALPHA,
      gamma: GAMMA,
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

    for (let i = 0; i < tabLength; i++) {
      initQTable.push({
        state: i + 1,
        1 : 0,
        2 : 0,
        3 : 0,
        4 : 0
      })
    }

    this.setQTable(initQTable)
    console.log(initQTable)
  }

  updateStates(states) {
    this.setState({ states: states })
  }

  render() {
    const {
      obstacles,
      states,
      qTable,
      openMenu,
      alpha,
      gamma
    } = this.state

    return (
      <div>
        <div>
          <EviromentToolbar
            handleOpenMenu={this.handleOpenMenu} />
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

