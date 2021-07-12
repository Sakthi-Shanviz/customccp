import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import { Component } from 'react';


const styles = () => ({
    container: {
        paddingBottom: '5px',
        paddingTop: '5px',
        // height: '80px',
        '& > p': {
            'whiteSpace': 'nowrap',
            overflow: 'hidden',
            'textOverflow': 'ellipsis'
        }
    },
    valueContainer: {
        textAlign: 'center',
        // marginTop: '10px',
        // marginBottom: '10px'
        
    }
});

class NumericCard extends Component {

    render() {
        const { classes } = this.props;
        return(
            <Paper className={classes.container}>
                <Typography variant="body2" align="center" title={this.props.header}>{this.props.header}</Typography>
                <Grid container>
                    <Grid item xs={12} className={classes.valueContainer}>
                        <Typography variant="h6" component="h4">{this.props.value}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

}

export default withStyles(styles, { withTheme: true })(NumericCard);