import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useScrollTrigger } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        margin: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function EviromentToolbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="Menu">
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