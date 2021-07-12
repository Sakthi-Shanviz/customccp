import { ContactFlowsActions } from '../action';
import DataState from '../../utilities/dataState';
import axios from 'axios';

const setContactFlowsList = (list) => ({
    type: ContactFlowsActions.SET_CONTACT_FLOWS_LIST,
    payload: list
});

const setContactFlowsListState = (state) => ({
    type: ContactFlowsActions.SET_CONTACT_FLOWS_LIST_VISIBILITY,
    payload: state
});

const setContactFlowPromptsList = (list) => ({
    type: ContactFlowsActions.SET_CONTACT_FLOW_PROMPTS,
    payload: list
});

const setContactFlowPromptsListState = (state) => ({
    type: ContactFlowsActions.SET_CONTACT_FLOW_PROMPTS_VISIBILITY,
    payload: state
});

export const fetchContactFlows = () => {
    
    return (dispatch, getState) => {
        
        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();

        dispatch(setContactFlowsListState(DataState.LOADING));

        axios.get(`${endpoint}${basepath}/${id}/contact-flows`)
            .then((res) => {
                const contactFlows = res.data.contactFlows.sort((a, b) => a.name.localeCompare(b.name));
                dispatch(setContactFlowsList(contactFlows));
                dispatch(setContactFlowsListState(DataState.OK));
            })
            .catch((err) => {
                console.log(err)
            })

    }

}


export const fetchContactFlowPrompts = (contactFlowId) => {
    
    return (dispatch, getState) => {
        
        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();

        dispatch(setContactFlowPromptsListState(DataState.LOADING));

        axios.get(`${endpoint}${basepath}/${id}/contact-flows/${contactFlowId}`)
            .then((res) => {
                const contactFlowPrompts = res.data.prompts
                    .filter((p) => p.type != 'PromptId' && !p.dynamic)
                    .map((p) => ({...p, value: typeof p.value === 'string' ? p.value : p.value.name}))
                    .sort((a, b) => a.id.localeCompare(b.id));
                dispatch(setContactFlowPromptsList(contactFlowPrompts));
                dispatch(setContactFlowPromptsListState(DataState.OK));
            })
            .catch((err) => {
                console.log(err)
            })

    }

}


export const updateContactFlowBlock = (contactFlowId, blockId, type, value, dynamic, connectPromptName) => {

    return (dispatch, getState) => {
        
        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();

        dispatch(setContactFlowPromptsListState(DataState.LOADING));

        axios.put(`${endpoint}${basepath}/${id}/contact-flows/${contactFlowId}/${blockId}`, {
            type,
            value,
            dynamic,
            promptName: connectPromptName
        }).then((res) => {
            dispatch(fetchContactFlowPrompts(contactFlowId));
        })
        .catch((err) => {
            console.log(err)
        })

    }

}