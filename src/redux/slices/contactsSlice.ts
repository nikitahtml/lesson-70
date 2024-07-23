import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

interface ContactsState {
    contacts: Contact[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ContactsState = {
    contacts: [],
    status: 'idle',
    error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const response = await axiosApi.get('/contacts.json');
    return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact: Contact) => {
    const response = await axiosApi.post('/contacts.json', newContact);
    return { ...newContact, id: response.data.name }; // Firebase generates a unique ID
});

export const updateContact = createAsyncThunk('contacts/updateContact', async (updatedContact: Contact) => {
    await axiosApi.put(`/contacts/${updatedContact.id}.json`, updatedContact);
    return updatedContact;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id: string) => {
    await axiosApi.delete(`/contacts/${id}.json`);
    return id;
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contacts = Object.keys(action.payload).map((key) => ({
                    id: key,
                    ...action.payload[key],
                }));
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch contacts';
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.contacts.findIndex((contact) => contact.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
            });
    },
});

export default contactsSlice.reducer;
