import { MetadataActions } from '../action';
export const setInstanceConfig = (instance) => ({
    type: MetadataActions.SET_INSTANCE_CONFIG,
    payload: instance
});

export const setAPIConfig = (api) => ({
    type: MetadataActions.SET_API_CONFIG,
    payload: api
})

export const setAttributeTracing = (attrs) => ({
    type: MetadataActions.SET_ATTRIBUTE_TRACING,
    payload: attrs
})

export const makeAppReady = () => ({
    type: MetadataActions.SET_APP_READY
})