import { Box, Paper, Table, TableBody, TableRow, TableCell, Typography, withStyles } from '@material-ui/core';
import { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { randomColor } from 'randomcolor';
import Color from 'color';
import { BeatLoader } from 'react-spinners';
import { Stop } from '@material-ui/icons';

const styles = () => ({
    container: {
        paddingBottom: '10px',
        paddingTop: '10px',
        minHeight: '150px'
    },
    header: {
        marginBottom: '10px'
    },
    table: {
        width: '70%',
        marginLeft: '15%',
        marginTop: '10px'
    },
    tableCell: {
        border: '0'
    },
    iconText: {
        display: 'flex',
        alignItems: 'center'
    },
    loader:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});

class AgentStatusDoughnut extends Component {

    constructor(props) {
        super(props);
        this.randomColors = randomColor({ count: 20, luminosity: 'bright', hue:'random' });
        this.backgroundColors = ['#86bc25', '#9a9a9a', '#f00', ...this.randomColors].map(color => Color(color).alpha(0.7).string());
    }

    render() {
        const { classes } = this.props;
        return(
            <Paper className={classes.container}>
                <Typography variant="h6" align="center" className={classes.header}>Agent Status</Typography>
                {
                    this.props.loading && <div className={classes.loader}><BeatLoader color="#86bc25" /></div>
                }
                {
                    this.props.loading || <Doughnut
                        data={{
                            datasets: [{
                                data: Object.values(this.props.data),
                                backgroundColor: this.backgroundColors
                            }],
                            labels: Object.keys(this.props.data)
                        }}
                        options={{
                            legend: {
                                display: false
                            }
                        }}
                    />
                }
                {
                    this.props.loading || <Table size="small" className={classes.table}>
                        <TableBody>
                            {
                                Object.entries(this.props.data).map(([key, val], i) =>
                                    <TableRow key={i}>
                                        <TableCell className={classes.tableCell}><Box className={classes.iconText}><Stop htmlColor={this.backgroundColors[i]} /><Typography variant="body1">{key}</Typography></Box></TableCell>
                                        <TableCell className={classes.tableCell}><Typography variant="body1">{val}</Typography></TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                }
            </Paper>
        )
    }

}

export default withStyles(styles, {withTheme: true})(AgentStatusDoughnut);