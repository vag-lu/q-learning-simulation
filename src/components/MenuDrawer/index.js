import React, { Component } from 'react'
import InputSlider from '../InputSlider/input'
import Drawer from '@material-ui/core/Drawer'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core'
import './index.css'

const drawerWidth = 300;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: '0 10px 0 10px'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
})

class MenuDrawer extends Component {

    render() {
        const {
            classes,
            handleCloseMenu,
            handleOpenMenu,
            handleAlphaChange,
            handleGammaChange,
            openMenu,
            alpha,
            gamma
        } = this.props

        return (
            <div>
                <Drawer
                    className={classes.drawer}
                    anchor="left"
                    open={openMenu}
                    onClose={handleCloseMenu}
                    onOpen={handleOpenMenu}
                    classes={{ paper: classes.drawerPaper, }}>

                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleCloseMenu}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className='menuItem'>
                        <InputSlider
                            title='Alpha ( &alpha; )'
                            value={alpha}
                            handleValueChange={handleAlphaChange} />
                    </div>
                    <div className='menuItem'>
                        <InputSlider
                            title='Gamma ( &gamma; )'
                            value={gamma}
                            handleValueChange={handleGammaChange} />
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(MenuDrawer)