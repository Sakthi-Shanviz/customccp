import { withStyles, Grid, Paper, Typography } from '@material-ui/core';

const styles = () => ({
    containerPadding: {
        padding: '10px',
    },
    container: {
        backgroundColor: '#f0f0f0',
        height: '100%',
        overflowY: 'scroll'
    },
    paper: {
        padding: '20px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    body: {
        marginTop: '20px'
    }
})

function PagePaperComponent(props) {
    const { classes, header, children, headerButton, compact } = props;
    
    return (<Grid style={{background: '#dcdcdc'}} container className={classes.container + ' ' + (!compact ? classes.containerPadding : '')}>
        <Grid item xs={12}>
            <Paper className={classes.paper} style={{background: '#dcdcdc'}} elevation={0}>
                <div className={classes.header}>
                    <Typography variant="h6" component="h5">{header}</Typography>
                    {headerButton}
                </div>
                <div className={!compact ? classes.body : ''}>
                    {children}
                </div>
            </Paper>
        </Grid>
    </Grid>)
        
}


export default withStyles(styles)(PagePaperComponent)