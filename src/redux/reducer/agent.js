import initialState from '../initialState';
import { AgentActions } from '../action';

const agentReducer = (state = initialState.agent, action) => {

    const _state = {...state};

    if(action.type === AgentActions.STORE_INFO) {
        return {...action.payload};
    }

    return _state;
}

export default agentReducer;