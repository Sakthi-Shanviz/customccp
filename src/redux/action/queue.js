import axios from 'axios';
import { QueueActions } from '../action';
import DataState from '../../utilities/dataState';

const updateQueueList = (queues) => ({
    type: QueueActions.UPDATE_QUEUE_LIST,
    payload: queues
})

const setQueueDataVisibility = (state) => ({
    type: QueueActions.SET_QUEUE_VISIBILITY,
    payload: state
})

export const refreshQueueList = () => {
    
    return (dispatch, getState) => {
        const {metadata: {api: {endpoint, basepath}, connect: {instance: {id}}}} = getState();
        dispatch(setQueueDataVisibility(DataState.LOADING));
        axios.get(`${endpoint}${basepath}/${id}/queue`)
            .then((res) => {
                dispatch(updateQueueList(res.data.queues));
                dispatch(setQueueDataVisibility(DataState.OK));
            })
            .catch((err) => {
                console.log(err)
            })
    }

}