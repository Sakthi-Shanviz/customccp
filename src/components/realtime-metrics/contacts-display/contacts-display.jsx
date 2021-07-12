import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import { Component } from 'react';
import { connect } from 'react-redux';


const styles = () => ({
    container: {
        paddingBottom: '10px',
        paddingTop: '10px'
    },
    valueContainer: {
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '10px'
    }
});

class ContactsDoughnut extends Component {

    render() {
        const { classes } = this.props;
        return(
            <Paper className={classes.container}>
                <Typography variant="h6" align="center">Contact Status</Typography>
                <Grid container>
                    <Grid item xs={6} className={classes.valueContainer}>
                        <Typography variant="h4" component="h4">{((this.props.data[this.props.queue] || {})["CONTACTS_IN_QUEUE"]) || 0}</Typography>
                        <Typography variant="body2">Queued</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.valueContainer}>
                        <Typography variant="h4" component="h4">{((this.props.data[this.props.queue] || {})["CONTACTS_SCHEDULED"]) || 0}</Typography>
                        <Typography variant="body2">Callback</Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

}

const mapStateToProps = (state) => ({
    data: state.metrics.realtime
})

const mapActionToProps = () => ({
    
})

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles, { withTheme: true })(ContactsDoughnut));