import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import contact from './ContactReviews.json';

//Function to delay the loading data
const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(data)
        }, time)
    })
}

//Async functions
export const fetchContacts = createAsyncThunk(
    'contact/fetchContacts',
    async () => {
        return await delay(contact);
    } 
);
export const fetchContact = createAsyncThunk(
    'contact/fetchContact',
    async (contactId) => {
        const contactById = contact.find((contact) => contact.id === contactId)
        return await delay(contactById);
    } 
);
export const createContact = createAsyncThunk(
    'contact/createContact',
    async (newContact) => {
        const createdContact = await delay(newContact)
        return createdContact;
    } 
);
export const updateContact = createAsyncThunk(
    'contact/updateContact',
    async (contactId, updateContact) => {
        const updated = await delay(updateContact)
        return updated;
    } 
);
export const deleteContact = createAsyncThunk(
    'contact/deleteContact',
    async (contactId) => {
        await delay();
        return contactId; // Devuelve el ID de la habitación a eliminar
    } 
);

export const roomSlice = createSlice({
    name: 'contact',
    initialState: {
    contacts: [],
    contact: null,
    status: 'idle',
    isloading: false,
    haserror: false,
    sortorder: 'none',
    active: false,
    },
    extraReducers:{
        [fetchContacts.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [fetchContacts.fulfilled] : (state, {payload}) => {
            state.contacts = payload
            state.status = 'success'
        },
        [fetchContacts.rejected] : (state, action) => {
            state.isloading = false
            state.haserror = true
            state.status = 'failed'
        },
        [createContact.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [createContact.fulfilled] : (state, {payload}) => {
            state.contact.push(payload)
            state.status = 'success'
        },
        [createContact.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [fetchContact.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [fetchContact.fulfilled] : (state, {payload}) => {
            state.contact = payload
            state.status = 'success'
        },
        [fetchContact.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [updateContact.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [updateContact.fulfilled] : (state, action) => {
            
            state.status = 'success'
            state.isloading = false
            state.active = true
        },
        [updateContact.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [deleteContact.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [deleteContact.fulfilled] : (state, {payload}) => {
            // Encuentra el índice de la habitación a eliminar por su ID
            const index = state.contacts.findIndex(contact => contact.id === payload);

            if (index !== -1) {
            // Elimina la habitación del array de habitaciones
            state.contacts.splice(index, 1);
            }

            state.status = 'success';
            state.isloading = false;
        },
        [deleteContact.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
    }
})

export default roomSlice.reducer;