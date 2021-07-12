import initialState from "../initialState";
import { ContactFlowsActions } from '../action';
import DataState from "../../utilities/dataState";

const contactFlowsReducer = (state = initialState.contactFlows, action) => {

    const _state = {...state};

    if(action.type == ContactFlowsActions.SET_CONTACT_FLOWS_LIST) {
        _state.list = [...action.payload];
    }

    if(action.type === ContactFlowsActions.SET_CONTACT_FLOWS_LIST_VISIBILITY) {
        _state.listState = action.payload
    }

    if(action.type === ContactFlowsActions.SET_CONTACT_FLOW_PROMPTS) {
        _state.promptList = [...action.payload];
    }

    if(action.type == ContactFlowsActions.SET_CONTACT_FLOW_PROMPTS_VISIBILITY) {
        _state.promptListState = action.payload;
    }   

    return _state;

}

export default contactFlowsReducer;