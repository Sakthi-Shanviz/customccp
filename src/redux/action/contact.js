import { ContactActions } from '../action';

export const addContact = (contactInfo) => {
    return {
        type: ContactActions.ADD_CONTACT,
        payload: contactInfo
    }
}