import initialState from '../initialState';
import { MetricActions as actionTypes } from '../action';

const metricsReducer = (state = initialState.metrics, action) => {

    const _state = {...state};

    if(action.type === actionTypes.REPLACE_METRICS_DATA) {
        _state.historic = action.payload;
    }

    if(action.type === actionTypes.REPLACE_REALTIME_METRICS_DATA) {
        _state.realtime = action.payload;
    }

    if(action.type === actionTypes.SET_REPORT_DATA) {
        _state.report = action.payload;
    }

    if(action.type === actionTypes.SET_AGENTS_DATA) {
        _state.agents = action.payload;
    }

    if(action.type === actionTypes.SET_AGENT_STATUS_VISIBILITY) {
        _state.agentStatusState = action.payload;
    }

    if(action.type === actionTypes.SET_REALTIME_METRIC_VISIBILITY) {
        _state.realtimeDataState = action.payload;
    }

    if(action.type === actionTypes.SET_HISTORIC_METRIC_VISIBILITY) {
        _state.historicDataState = action.payload;
    }

    if(action.type === actionTypes.SET_REPORT_VISIBILITY) {
        _state.reportDataState = action.payload;
    }

    if(action.type === actionTypes.SET_AGENTS_VISIBILITY) {
        _state.agentsState = action.payload;
    }

    if(action.type === actionTypes.SET_AGENT_STATUS_DATA) {
        _state.agentStatus = action.payload;
    }

    if(action.type === actionTypes.SET_ATTRIBUTE_REPORT_VISIBILITY) {
        _state.attributeReportDataState = action.payload;
    }

    if(action.type === actionTypes.SET_ATTRIBUTE_REPORT_DATA) {
        _state.attributeReport = action.payload;
    }

    return _state;

}

export default metricsReducer;