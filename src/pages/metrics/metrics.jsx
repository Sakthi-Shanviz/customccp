import { Box, Button, Grid, FormControl, Select, InputLabel, MenuItem, Typography, Table, TableHead, TableRow, TableBody, TableContainer } from '@material-ui/core';
import { SyncOutlined } from '@material-ui/icons';
import { Component } from 'react';
import { connect } from 'react-redux';
import DateFormat from 'dateformat';
import { BeatLoader } from 'react-spinners';
import AgentStatusDoughnut from '../../components/realtime-metrics/agent-status-doughnut/agent-status-doughnut';
import ContactsDisplay from '../../components/realtime-metrics/contacts-display/contacts-display';
import SlotDisplay from '../../components/realtime-metrics/slot-display/slot-display';
import MetricLineGraph from '../../components/realtime-metrics/metrics-line-graph/metrics-line-graph';
import PagePaperComponent from '../../components/styled-components/page-paper';
import NumericCard from '../../components/card-numeric-display/card-numeric-display';
import TableCell from '../../components/styled-components/table-cell';
import TimeHumanizer from "humanize-duration";

import { refreshHistoricMetrics, refreshRealtimeMetrics, refreshAgentStatus } from '../../redux/action/metrics';
import { refreshQueueList } from '../../redux/action/queue';
import DataState from '../../utilities/dataState';

import styles from './metrics.module.sass';
import { withRouter } from 'react-router';

const timeHumanize = TimeHumanizer.humanizer({
    language: "shortEn",
    languages: {
        shortEn: {
            y: ()=>'',
            mo: ()=>'',
            w: () => '',
            d: () => '',
            h: () => '',
            m: () => '',
            s: () => '',
            ms: () => ''
        }
    },
    delimiter: ':'
})

const formatDuration = (ms) => {
    const h = Math.floor(ms/3600000).toString().padStart(2, '0');
    const m = Math.floor((ms - h*3600000)/60000).toString().padStart(2, '0');
    const s = Math.floor((ms - h*3600000 - m*60000)/1000).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

class MetricsPage extends Component {

    constructor(props) {
        super(props);

        console.log(this.props.history);

        const state = {
            selectedQueue: 'all',
            timer: 1,
            metrics: ["AGENTS_AFTER_CONTACT_WORK", "AGENTS_AVAILABLE", "AGENTS_ERROR", "AGENTS_NON_PRODUCTIVE", "AGENTS_ON_CALL", "AGENTS_ONLINE", "AGENTS_STAFFED", "CONTACTS_IN_QUEUE", "CONTACTS_SCHEDULED", "OLDEST_CONTACT_AGE", "SLOTS_ACTIVE", "SLOTS_AVAILABLE"]
        }
        if(this.props.agentView) {
            state.metrics = ["AGENTS_ON_CALL", "AGENTS_ONLINE", "AGENTS_NON_PRODUCTIVE", "CONTACTS_IN_QUEUE", "CONTACTS_SCHEDULED", "OLDEST_CONTACT_AGE"];
            state.agentView = true;
        }

        this.state = {...state}

        this.trigRefreshHistoricMetrics = this.trigRefreshHistoricMetrics.bind(this);
        this.selectQueue = this.selectQueue.bind(this);
    }

    componentDidMount() {
        console.log(this.props.agentView)
        if(this.props.agentView) {
            this.setState({
                metrics: ["AGENTS_ON_CALL", "AGENTS_ONLINE", "AGENTS_NON_PRODUCTIVE", "CONTACTS_IN_QUEUE", "CONTACTS_SCHEDULED", "OLDEST_CONTACT_AGE"],
                agentView: true
            });
        }
        

        this.props.refreshQueueList();
        // this.trigRefreshHistoricMetrics();

        this.secondsInterval = setInterval(() => {
            if(this.state.timer - 1 == 0){
                this.props.refreshRealtimeMetrics();
                this.setState({
                    timer: 15
                });
            } else {
                this.setState({
                    timer: this.state.timer - 1
                });
            } 
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.secondsInterval);
    }

    trigRefreshHistoricMetrics() {
        this.setState({
            timer: 15
        })
        // this.props.refreshHistoricMetrics();
        this.props.refreshRealtimeMetrics();
        // this.props.refreshAgentStatus();
    }

    selectQueue(queueName) {
        this.setState({
            selectedQueue: queueName
        })
    }

    render() {
        return(
            <PagePaperComponent
                header="Real Time Metrics"
                headerButton={
                    <></>
                }
                compact={true}
            >
                <Box className={styles.optionsBox} style={{float: this.state.agentView ? 'right' : 'inherit'}}>
                    {
                        !this.state.agentView && <FormControl>
                            <InputLabel>Queue</InputLabel>
                            <Select variant="standard" defaultValue={"all"} className={styles.queueSelector} onChange={({target})=>this.selectQueue(target.value)} >
                                <MenuItem value={"all"}>All</MenuItem>
                                {
                                    this.props.queues.list.map((queue, i) =>
                                        <MenuItem value={queue.name}>{queue.name}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    }
                    <div>
                        <Typography style={{display: 'inline', marginRight: '15px'}} variant="body2">Refreshing in {this.state.timer}s</Typography>
                        <Button size="small" variant="contained" color="primary" startIcon={<SyncOutlined />} onClick={this.trigRefreshHistoricMetrics}>Refresh</Button>
                    </div>
                </Box>
                <Grid container spacing={1} justify="center" alignItems="stretch">
                    {
                        this.props.realtimeDataState == DataState.LOADING && <Grid item xs={2}>
                            <BeatLoader color="#86bc25" />
                        </Grid>
                    }
                {
                    (this.props.realtimeDataState == DataState.OK && this.props.realtimeMetrics) && 
                    <>
                        <TableContainer>
                            <Table size="small">
                                {
                                    this.props.agentView && <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2}>AGENT METRICS</TableCell>
                                            <TableCell colSpan={2}>QUEUE METRICS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                }
                                <TableBody>
                                    {
                                        (this.props.realtimeMetrics[this.state.selectedQueue] && this.props.agentView) && <>
                                            <TableRow>
                                                <TableCell width="115px">AGENTS ONLINE</TableCell>
                                                <TableCell width="15px">{this.props.realtimeMetrics[this.state.selectedQueue]['AGENTS_ONLINE']}</TableCell>
                                                <TableCell>CALLS WAITING IN QUEUE</TableCell>
                                                <TableCell>{this.props.realtimeMetrics[this.state.selectedQueue]['CONTACTS_IN_QUEUE']}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>AGENTS ON CALL</TableCell>
                                                <TableCell>{this.props.realtimeMetrics[this.state.selectedQueue]['AGENTS_ON_CALL']}</TableCell>
                                                <TableCell rowSpan={2}>OLDEST CALL WAITING IN QUEUE (HH:MM:SS)</TableCell>
                                                <TableCell rowSpan={2}>{formatDuration(parseInt(this.props.realtimeMetrics[this.state.selectedQueue]['OLDEST_CONTACT_AGE']))}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>AGENTS AVAILABLE</TableCell>
                                                <TableCell>{this.props.realtimeMetrics[this.state.selectedQueue]['AGENTS_AVAILABLE']}</TableCell>
                                                {/* <TableCell></TableCell>
                                                <TableCell></TableCell> */}
                                            </TableRow>
                                        </>
                                    }
                                    {
                                        (this.props.realtimeMetrics[this.state.selectedQueue] && !this.props.agentView) && 
                                                <>{
                                                    this.state.metrics
                                                        .reduce((prev, curr, i) => {
                                                            if(!prev[Math.floor((i)/2)]){
                                                                prev.push([]);
                                                            }
                                                            prev[prev.length - 1].push(curr);
                                                            return prev;
                                                        }, [])
                                                        .map((headerArr) => <TableRow>
                                                            {
                                                                headerArr.map((header) => <>
                                                                    <TableCell>{header}</TableCell>
                                                                    <TableCell>{this.props.realtimeMetrics[this.state.selectedQueue][header]}</TableCell>
                                                                </>)
                                                            }
                                                        </TableRow>)
                                                }</>
                                    }
                                    {
                                        !this.props.realtimeMetrics[this.state.selectedQueue] && <>
                                            <TableRow>
                                                <TableCell align="center">No Data Found</TableCell>
                                            </TableRow>
                                        </>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* <Grid item>

                        </Grid> */}
                        {/* <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {
                                            this.state.metrics
                                                .map((metricLabel) => <TableCell style={{width: '75px'}}>{metricLabel}</TableCell>)
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {
                                            this.state.metrics.map((metricLabel) => <TableCell>{this.props.realtimeMetrics[this.state.selectedQueue][metricLabel]}</TableCell>)
                                        }
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer> */}
                        {/* <Grid item xs className={styles.gridItems}>
                            <NumericCard
                                header="Agents on Call"
                                value={this.props.realtimeMetrics[this.state.selectedQueue]['AGENTS_ON_CALL']}
                            ></NumericCard>
                        </Grid>
                        <Grid item xs className={styles.gridItems}>
                            <NumericCard
                                header="Agents Online"
                                value={this.props.realtimeMetrics[this.state.selectedQueue]['AGENTS_ONLINE']}
                            ></NumericCard>
                        </Grid>
                        <Grid item xs className={styles.gridItems}>
                            <NumericCard
                                header="Contacts Queued"
                                value={this.props.realtimeMetrics[this.state.selectedQueue]['CONTACTS_IN_QUEUE']}
                            ></NumericCard>
                        </Grid>
                        <Grid item xs className={styles.gridItems}>
                            <NumericCard
                                header="Contacts Scheduled"
                                value={this.props.realtimeMetrics[this.state.selectedQueue]['CONTACTS_SCHEDULED']}
                            ></NumericCard>
                        </Grid>
                        <Grid item xs className={styles.gridItems}>
                            <NumericCard
                                header="Oldest Contact Age"
                                value={this.props.realtimeMetrics[this.state.selectedQueue]['OLDEST_CONTACT_AGE'] == 0 ? '-' :this.props.realtimeMetrics[this.state.selectedQueue]['OLDEST_CONTACT_AGE']}
                            ></NumericCard>
                        </Grid> */}
                        {/* <Grid item xs={4} className={styles.gridItems}>
                            {
                                <AgentStatusDoughnut
                                    data={this.props.agentStatus[this.state.selectedQueue] || {}}
                                    loading={this.props.agentStatusState === DataState.LOADING}
                                />
                            }
                        </Grid>
                        <Grid item xs={8} className={styles.gridItems}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <ContactsDisplay queue={this.state.selectedQueue} />
                                </Grid>
                                <Grid item xs={4}>
                                    <SlotDisplay queue={this.state.selectedQueue} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} className={styles.gridItems}>
                            <MetricLineGraph
                                loading={this.props.historicDataState === DataState.LOADING}
                                header={"Contacts Handled"}
                                xAxis={this.props.historicMetrics.map((entry) => DateFormat(new Date(`${entry["e"]} GMT`), "h':'MM"))}
                                yAxis={this.props.historicMetrics.map((entry) => (entry[this.state.selectedQueue] || {})["CONTACTS_HANDLED"] || 0)}
                                thresholds={[5]}
                                lineColor="#86bc25"
                            />
                        </Grid>
                        <Grid item xs={4} className={styles.gridItems}>
                            <MetricLineGraph
                                loading={this.props.historicDataState === DataState.LOADING}
                                header={"Contacts Abandoned"}
                                xAxis={this.props.historicMetrics.map((entry) => DateFormat(new Date(`${entry["e"]} GMT`), "h':'MM"))}
                                yAxis={this.props.historicMetrics.map((entry) => (entry[this.state.selectedQueue] || {})["CONTACTS_ABANDONED"] || 0)}
                                thresholds={[1]}
                            />
                        </Grid>
                        <Grid item xs={4} className={styles.gridItems}>
                            <MetricLineGraph
                                loading={this.props.historicDataState === DataState.LOADING}
                                header={"Contacts Abandoned"}
                                xAxis={this.props.historicMetrics.map((entry) => DateFormat(new Date(`${entry["e"]} GMT`), "h':'MM"))}
                                yAxis={this.props.historicMetrics.map((entry) => (entry[this.state.selectedQueue] || {})["CONTACTS_ABANDONED"] || 0)}
                                thresholds={[1]}
                            />
                        </Grid>
                        <Grid item xs={4} className={styles.gridItems}>
                            <MetricLineGraph
                                loading={this.props.historicDataState === DataState.LOADING}
                                header={"Avg Queued Time"}
                                xAxis={this.props.historicMetrics.map((entry) => DateFormat(new Date(`${entry["e"]} GMT`), "h':'MM"))}
                                yAxis={this.props.historicMetrics.map((entry) => (entry[this.state.selectedQueue] || {})["QUEUE_ANSWER_TIME"] || 0)}
                                thresholds={[2]}
                            />
                        </Grid> */}
                    </>
                }
                </Grid>
            </PagePaperComponent>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        queues: state.queues,

        historicMetrics: state.metrics.historic,
        historicDataState: state.metrics.historicDataState,

        realtimeMetrics: state.metrics.realtime,
        realtimeDataState: state.metrics.realtimeDataState,
        
        agentStatus: state.metrics.agentStatus,
        agentStatusState: state.metrics.agentStatusState
    } 
}

const mapActionToProps = (dispatch) => ({
    refreshQueueList: () => dispatch(refreshQueueList()),
    refreshHistoricMetrics: () => dispatch(refreshHistoricMetrics()),
    refreshRealtimeMetrics: () => dispatch(refreshRealtimeMetrics()),
    refreshAgentStatus: () => dispatch(refreshAgentStatus())
})

export default connect(mapStateToProps, mapActionToProps)(withRouter(MetricsPage));