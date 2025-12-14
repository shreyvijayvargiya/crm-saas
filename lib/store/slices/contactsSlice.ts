import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
	contact_id: string;
	entity_id: string;
	first_name: string;
	last_name: string;
	email: string | null;
	phone: string | null;
	job_title: string | null;
	is_primary_contact: boolean;
	has_login_access?: boolean;
}

interface ContactsState {
	contactsByEntity: Record<string, Contact[]>;
	loading: Record<string, boolean>;
	error: Record<string, string | null>;
}

const initialState: ContactsState = {
	contactsByEntity: {},
	loading: {},
	error: {},
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		setContacts: (
			state,
			action: PayloadAction<{ entityId: string; contacts: Contact[] }>
		) => {
			state.contactsByEntity[action.payload.entityId] = action.payload.contacts;
			state.loading[action.payload.entityId] = false;
			state.error[action.payload.entityId] = null;
		},
		setLoading: (
			state,
			action: PayloadAction<{ entityId: string; loading: boolean }>
		) => {
			state.loading[action.payload.entityId] = action.payload.loading;
		},
		setError: (
			state,
			action: PayloadAction<{ entityId: string; error: string | null }>
		) => {
			state.error[action.payload.entityId] = action.payload.error;
			state.loading[action.payload.entityId] = false;
		},
		addContact: (
			state,
			action: PayloadAction<{ entityId: string; contact: Contact }>
		) => {
			const contacts = state.contactsByEntity[action.payload.entityId] || [];
			state.contactsByEntity[action.payload.entityId] = [
				action.payload.contact,
				...contacts,
			];
		},
		removeContact: (
			state,
			action: PayloadAction<{ entityId: string; contactId: string }>
		) => {
			const contacts = state.contactsByEntity[action.payload.entityId] || [];
			state.contactsByEntity[action.payload.entityId] = contacts.filter(
				(c) => c.contact_id !== action.payload.contactId
			);
		},
		updateContactAccess: (
			state,
			action: PayloadAction<{ entityId: string; contactId: string }>
		) => {
			const contacts = state.contactsByEntity[action.payload.entityId] || [];
			const contact = contacts.find(
				(c) => c.contact_id === action.payload.contactId
			);
			if (contact) {
				contact.has_login_access = true;
			}
		},
	},
});

export const {
	setContacts,
	setLoading,
	setError,
	addContact,
	removeContact,
	updateContactAccess,
} = contactsSlice.actions;

export default contactsSlice.reducer;
