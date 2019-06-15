import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core';

const styles = theme =>( {
    root: {
        flexGrow: 1,
    },
    icon: {
        margin: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
})

class EviromentToolbar extends Component {

    render() {
        const {
            classes,
            handleOpenMenu
        } = this.props
        
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="end" className={classes.menuButton} color="inherit"
                            onClick={handleOpenMenu} aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Button color="inherit">
                            Start
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(EviromentToolbar)