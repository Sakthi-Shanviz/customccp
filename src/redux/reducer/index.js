import { combineReducers } from '@reduxjs/toolkit';

import agentReducer from './agent';
import contactReducer from './contact';
import metadataReducer from './metadata';

export default combineReducers({
    agent: agentReducer,
    contact: contactReducer,
    metadata: metadataReducer
})
