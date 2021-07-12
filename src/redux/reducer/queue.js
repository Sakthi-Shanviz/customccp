import initialState from '../initialState';
import { QueueActions } from '../action';

const queueReducer = (state = initialState.queues, action) => {

    const _state = {...state};
    
    if(action.type === QueueActions.SET_QUEUE_VISIBILITY) {
        _state.queueDataState = action.payload;
    }

    if(action.type === QueueActions.UPDATE_QUEUE_LIST) {
        _state.list = action.payload;
    }
    
    return _state;

}

export default queueReducer;