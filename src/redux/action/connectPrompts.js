import { ConnectPromptsActions } from '../action';
import DataState from '../../utilities/dataState';
import axios from 'axios';

const setConnectPrompts = (list) => ({
    type: ConnectPromptsActions.SET_CONNECT_PROMPTS,
    payload: list
});

const setConnectPromptsState = (state) => ({
    type: ConnectPromptsActions.SET_CONNECT_PROMPTS_VISIBILITY,
    payload: state
});

export const fetchConnectPrompts = () => {
    
    return (dispatch, getState) => {
        
        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();

        dispatch(setConnectPromptsState(DataState.LOADING));

        axios.get(`${endpoint}${basepath}/${id}/prompts`)
            .then((res) => {
                const prompts = res.data.prompts.sort((a, b) => a.name.localeCompare(b.name));
                dispatch(setConnectPrompts(prompts));
                dispatch(setConnectPromptsState(DataState.OK));
            })
            .catch((err) => {
                console.log(err)
            })

    }

}