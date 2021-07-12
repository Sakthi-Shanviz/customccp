import initialState from "../initialState";
import { ConnectPromptsActions } from '../action';

const connectPromptsReducer = (state = initialState.connectPrompts, action) => {

    const _state = {...state};

    if(action.type == ConnectPromptsActions.SET_CONNECT_PROMPTS) {
        _state.list = [...action.payload];
    }

    if(action.type === ConnectPromptsActions.SET_CONNECT_PROMPTS_VISIBILITY) {
        _state.listState = action.payload
    }

    return _state;

}

export default connectPromptsReducer;