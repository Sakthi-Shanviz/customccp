import axios from 'axios';
import { Parser } from 'json2csv';
import DateFormat from 'dateformat';
import { MetricActions } from '../action';
import DataState from '../../utilities/dataState';
import { downloadAsFile } from '../../utilities/file';

const replceMetricsData = (metrics) => ({
    type: MetricActions.REPLACE_METRICS_DATA,
    payload: metrics
});

const replceRealtimeMetricsData = (metrics) => ({
    type:  MetricActions.REPLACE_REALTIME_METRICS_DATA,
    payload: metrics
});

const setHistoricMetricVisibility = (state) => ({
    type: MetricActions.SET_HISTORIC_METRIC_VISIBILITY,
    payload: state
});

const setRealtimeMetricVisibility = (state) => ({
    type: MetricActions.SET_REALTIME_METRIC_VISIBILITY,
    payload: state
});

const setReportVisibility = (state) => ({
    type: MetricActions.SET_REPORT_VISIBILITY,
    payload: state
})

const setReportData = (data) => ({
    type: MetricActions.SET_REPORT_DATA,
    payload: data
});

const setAgentVisibility = (state) => ({
    type: MetricActions.SET_AGENTS_VISIBILITY,
    payload: state
});

const setAgentData = (state) => ({
    type: MetricActions.SET_AGENTS_DATA,
    payload: state
});

const setAgentStatusVisibility = (state) => ({
    type: MetricActions.SET_AGENT_STATUS_VISIBILITY,
    payload: state
});

const setAgentStatusData = (data) => ({
    type: MetricActions.SET_AGENT_STATUS_DATA,
    payload: data
});

const setAttributeReportVisibility = (state) => ({
    type: MetricActions.SET_ATTRIBUTE_REPORT_VISIBILITY,
    payload: state
});

const setAttributeReportData = (data) => ({
    type: MetricActions.SET_ATTRIBUTE_REPORT_DATA,
    payload: data
});

export const refreshHistoricMetrics = () => {

    return (dispatch, getState) => {
        
        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();

        dispatch(setHistoricMetricVisibility(DataState.LOADING));
        const endTime = new Date();
        if(endTime.getMinutes() % 5 !== 0){
            endTime.setMinutes(endTime.getMinutes() - (endTime.getMinutes() % 5));
        }
        const startTime = new Date(endTime.getTime())
        startTime.setHours(endTime.getHours() - 1);

        axios.get(`${endpoint}${basepath}/${id}/metrics/historic`, {
            params: {
                startTime: DateFormat(startTime, "yyyy-mm-dd'T'HH:MM", true),
                endTime: DateFormat(endTime, "yyyy-mm-dd'T'HH:MM", true),
                interval: 5
            }
        })
            .then((res) => {
                dispatch(replceMetricsData(res.data.metrics));
                dispatch(setHistoricMetricVisibility(DataState.OK));
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

export const refreshRealtimeMetrics = () => {

    return (dispatch, getState) => {
        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();

        dispatch(setRealtimeMetricVisibility(DataState.LOADING));
        axios.get(`${endpoint}${basepath}/${id}/metrics/realtime`)
            .then((res) => {
                dispatch(replceRealtimeMetricsData(res.data.metrics));
                dispatch(setRealtimeMetricVisibility(DataState.OK));
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

export const refreshAgentStatus = () => {

    return (dispatch, getState) => {
        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();

        dispatch(setAgentStatusVisibility(DataState.LOADING));
        axios.get(`${endpoint}${basepath}/${id}/metrics/realtime/agent-status`)
            .then((res) => {
                dispatch(setAgentStatusData(res.data));
                dispatch(setAgentStatusVisibility(DataState.OK));
            })
            .catch((err) => {
                console.log(err)
            })

    }

}

export const fetchHistoricReport = (metricCategory, metricType, startTime, endTime, download) => {

    return (dispatch, getState) => {

        dispatch(setReportVisibility(DataState.LOADING))

        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();
        
        axios.get(`${endpoint}${basepath}/${id}/metrics/report`, {
            params: {
                startTime,
                endTime,
                metricCategory,
                metricType
            }
        }).then((res) => {
            const metrics = res.data.metrics;
            const processed_metrics = metrics.map(row => { delete row.count; return row })
            if(download) {
                const csv = new Parser().parse(processed_metrics);
                downloadAsFile('historic_report.csv', csv, 'text/csv');
                dispatch(setReportData([]));
            } else {
                dispatch(setReportData(processed_metrics));
            }
            dispatch(setReportVisibility(DataState.OK));
        }).catch((err) => {
            dispatch(setReportVisibility(DataState.ERROR))
        })
        
    }
}

export const refreshAgentMetrics = () => {

    return (dispatch, getState) => {

        dispatch(setAgentVisibility(DataState.LOADING));

        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();

        axios.get(`${endpoint}${basepath}/${id}/metrics/agent`)
            .then((res) => {

                const data = res.data.agents;
                dispatch(setAgentData(data.map((agent) => {
                    let lowestHierarchyLevel = ''
                    if(agent.hierarchy && agent.hierarchy[0]){
                        lowestHierarchyLevel = agent.hierarchy[agent.hierarchy.length - 1];
                    }
                    const voiceContact = agent.contacts.find((contact) => contact.channel === "VOICE");
                    let status = agent.status;
                    if(voiceContact) {
                        if(voiceContact.state === 'CONNECTED') {
                            status = 'In Call'
                        } else if (voiceContact.state === 'ENDED') {
                            status = 'After Call Work'
                        }
                    }
                    return {...agent, status, lowestHierarchyLevel}
                })));
                dispatch(setAgentVisibility(DataState.OK));
            }).catch((err) => {
                console.log(err);
                dispatch(setAgentVisibility(DataState.ERROR));
            })

    }

}

export const fetchAttributeReport = (startDateStr, endDateStr) => {

    return (dispatch, getState) => {

        dispatch(setAttributeReportVisibility(DataState.LOADING));

        const startDate = new Date(startDateStr);
        const endDate =new Date(endDateStr);
        const totalDays = (endDate - startDate)/(1000*60*60*24);
        const dates = new Array(totalDays + 1).fill(1).map((val, i) => DateFormat(new Date(startDate.setDate(startDate.getDate() + (i ? 1 : 0))), 'yyyy-mm-dd'));

        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();
        const promises = dates.map((dt) => axios.get(`${endpoint}${basepath}/${id}/metrics/ctr`, {
                params: {
                    show: 'attributes',
                    date: dt
                }
            })
            .then((res) => res.data.metrics)
            .catch((err) => [])
        );

        Promise.all(promises).then((resps) => {
            const reducedResponse = resps.map((date) => {
                const attrs = {};
                date.forEach((flow) => {
                    flow.forEach((ctr) => {
                        Object.entries(ctr.attributes || {}).forEach(([key, val]) => {
                            if(!attrs[key]) {
                                attrs[key] = 0;
                            }
                            attrs[key] += 1;
                        })
                    });
                });
                return attrs;
            })
            
            dispatch(setAttributeReportData({
                dateRange: dates,
                data: reducedResponse
            }));
            dispatch(setAttributeReportVisibility(DataState.OK));
        })

    }

}