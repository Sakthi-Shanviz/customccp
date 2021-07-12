import initialState from '../initialState';
import { ContactActions } from '../action';

const contactReducer = (state = initialState.contact, action) => {

    const _state = {...state};

    if(action.type === ContactActions.ADD_CONTACT) {
        _state.list.unshift(action.payload);
        _state.current = action.payload;
    }

    return _state;
}

export default contactReducer;