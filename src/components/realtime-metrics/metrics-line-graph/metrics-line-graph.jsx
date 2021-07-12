import { Paper, Typography, withStyles } from '@material-ui/core';
import { BeatLoader } from 'react-spinners';
import { Component } from 'react';
import { Line } from 'react-chartjs-2';
import RandomColor from 'randomcolor';
import Color from 'color';


const styles = () => ({
    container: {
        height: '100%',
        paddingBottom: '10px',
        paddingTop: '10px',
        minHeight: '150px'
    },
    messages:{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class MetricLineGraph extends Component {

    constructor(props) {
        super(props);

        this.color = RandomColor({luminosity: 'bright', hue: 'random'})

    }

    render() {
        const { classes } = this.props;
        return(
            <Paper className={classes.container}>
                <Typography variant="h6" align="center">{this.props.header}</Typography>
                {
                    this.props.loading && <div className={classes.messages}><BeatLoader color="#86bc25" /></div>
                }
                {
                    this.props.loading || <Line
                        data={{
                            datasets: [
                                {
                                    label: '',
                                    fill: true,
                                    backgroundColor: Color(this.props.lineColor || this.color).alpha(0.4).string(),
                                    data: this.props.yAxis,
                                    borderColor: (this.props.lineColor || this.color),
                                    borderWidth: 0.5,
                                    pointRadius: 2
                                }, ...this.props.thresholds.map((t) => {
                                    return {
                                        label: 'threshold',
                                        fill: false,
                                        backgroundColor: '#ff000066',
                                        data: new Array(this.props.xAxis.length).fill(1).map(() => t),
                                        borderColor: '#ff0000',
                                        borderWidth: 0.5,
                                        pointRadius: 0,
                                        pointHoverRadius: 0,
                                        pointHitRadius: 0
                                    }
                                })
                            ],
                            labels: this.props.xAxis
                        }}
                        options={{
                            legend: {
                                display: false,
                                position: 'top',
                                labels: {
                                    fontFamily: 'Lato',
                                    boxWidth: 25
                                }
                            },
                            scales: {
                                yAxes: [
                                    {
                                        gridLines: {
                                            drawOnChartArea: false
                                        },
                                        ticks: {
                                            max: [...this.props.thresholds, ...this.props.yAxis].reduce((prev, curr) => prev > curr ? prev : curr) + 2,
                                            maxTicksLimit: 10
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        gridLines: {
                                            drawOnChartArea: false
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                }
            </Paper>
        )
    }

}

export default withStyles(styles, { withTheme: true })(MetricLineGraph);