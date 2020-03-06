import * as actionTypes from './actionTypes';
export const createContact = (contact) => {
	console.log(contact);
	return {
		type: actionTypes.CREATE_NEW_CONTACT,
		payload: {
			contact : contact
		}
	}
};

export const deleteContact = (id) => {
	console.log(id);
	return {
		type: actionTypes.REMOVE_CONTACT,
		payload: id
	}
};

export const updateContact = (contact, id) => {
	return {
		type: actionTypes.UPDATE_CONTACT,
		payload: {
			contact : contact,
			id : id
		}
	}
};

export const getContact = (id) => {
	return{
		type: actionTypes.GET_CONTACT,
		payload: id
	}
};