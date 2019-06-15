import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/lab/Slider'
import { withStyles } from '@material-ui/styles'

const styles = {
    root: {
        width: 250,
    },
}

class InputSlider extends Component {

    handleSliderChange = (event, newValue) => {
        this.props.handleValueChange((newValue/100).toFixed(1))
    }

    render() {
        const {
            value,
            title,
            classes
        } = this.props

        return (
            <div className={classes.root}>
                <Typography id="input-slider" gutterBottom>
                    {title}
                </Typography>
                <Grid container spacing={5} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={(value * 100)}
                            onChange={this.handleSliderChange}
                            aria-labelledby="input-slider" />
                    </Grid>
                    <Grid item alignContent="flex-start">
                        <Typography >
                            {value}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(InputSlider);