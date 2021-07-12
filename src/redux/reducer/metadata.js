import initialState from '../initialState';
import { MetadataActions } from '../action';

const metadataReducer = (state = initialState.metadata, action) => {

    const _state = {...state};

    if(action.type === MetadataActions.SET_INSTANCE_CONFIG) {
        _state.connect.instance = action.payload;
    }

    if(action.type === MetadataActions.SET_API_CONFIG) {
        _state.api = action.payload;
    }

    if(action.type === MetadataActions.SET_APP_READY) {
        _state.appReady = true;
    }

    if(action.type === MetadataActions.SET_ATTRIBUTE_TRACING) {
        _state.attributeTracing = action.payload;
    }

    return _state;

}

export default metadataReducer;