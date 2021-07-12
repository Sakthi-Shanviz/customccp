import { combineReducers } from '@reduxjs/toolkit';

import agentReducer from './agent';
import contactReducer from './contact';
import queueReducer from './queue';
import metricsReducer from './metrics';
import metadataReducer from './metadata';
import contactFlowsReducer from './contactFlows';
import connectPromptsReducer from './connectPrompts';

export default combineReducers({
    agent: agentReducer,
    contact: contactReducer,
    queues: queueReducer,
    metrics: metricsReducer,
    metadata: metadataReducer,
    contactFlows: contactFlowsReducer,
    connectPrompts: connectPromptsReducer
})
