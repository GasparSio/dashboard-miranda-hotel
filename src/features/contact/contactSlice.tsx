import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../../util/fetchData';

export interface ContactType {
    date: string,
    _id?: string,
    full_name: string,
    email: string,
    phone_number: string,
    subject_of_review: string,
    review_body: string,
    status: string,
}


//Async functions
export const fetchContacts = createAsyncThunk<ContactType[], void>(
    'contact/fetchContacts',
    async () => fetchData({ endpoint: 'contacts', method: 'GET' })
);

interface Update {
    archived: boolean;
  }
  type UpdateContactArgs = {
    contactId: number;
    update: Update;
  };


  export const updateContact = createAsyncThunk(
    'contact/updateContact',
    async (contactId: string) => fetchData({endpoint: `contacts/${contactId}`, method: 'PUT', body: {status: 'Archived'}, id: contactId})
  );


interface ContactState {
    contacts: ContactType[],
    contact: ContactType | null,
    status: string,
    isloading: boolean,
    haserror: boolean,
}
const initialState: ContactState = {
    contacts: [],
    contact: null,
    status: 'idle',
    isloading: false,
    haserror: false,
}
export const roomSlice = createSlice({
    name: 'contact',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchContacts.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(fetchContacts.fulfilled, (state, action) => {
            state.contacts = action.payload;
            state.status = 'success';
            state.isloading = false;
          })
          .addCase(fetchContacts.rejected, (state) => {
            state.isloading = false;
            state.haserror = true;
            state.status = 'failed';
          })
          .addCase(updateContact.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(updateContact.fulfilled, (state, action) => {
            state.status = 'success';
            state.contacts.map((contact) => contact._id === action.payload._id
              ? (contact.status = 'Archived')
              : null
              )
              console.log('action payload reducer', action.payload);
          })
          .addCase(updateContact.rejected, (state) => {
            state.haserror = true;
            state.status = 'failed';
          })
    }
})

export default roomSlice.reducer;