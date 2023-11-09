import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contactReview } from './ContactReviews';

const contactReviewData: ContactType[] = contactReview;

export interface ContactType {
    date: string,
    id: number,
    fullname: string,
    email: string,
    phone: string,
    asunto: string,
    comment: string,
    archived: boolean,
}

//Function to delay the loading data
const delay = (data: ContactType[] | ContactType, time: number = 200) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(data)
        }, time)
    })
}

//Async functions
export const fetchContacts = createAsyncThunk<ContactType[], void>(
    'contact/fetchContacts',
    async (): Promise<ContactType[]> => {
        return await delay(contactReviewData) as ContactType[];
    } 
);
export const fetchContact = createAsyncThunk<ContactType, number>(
    'contact/fetchContact',
    async (contactId: number): Promise<ContactType> => {
        const contactById: ContactType | undefined = contactReviewData.find((contact) => contact.id === contactId)

        if (contactById !== undefined) {
            return await delay(contactById) as ContactType;
        } else {
            throw new Error('No se encontró la reserva con el ID proporcionado');
        }
    } 
);
// export const createContact = createAsyncThunk(
//     'contact/createContact',
//     async (newContact) => {
//         const createdContact = await delay(newContact)
//         return createdContact;
//     } 
// );

interface Update {
    archived: boolean;
  }
  type UpdateContactArgs = {
    contactId: number;
    update: Update;
  };

//Function to find and update the contact in the JSON data
const updateContactInData = (contacts: ContactType[], contactId: number, update: Update): ContactType[] => {
    return contacts.map((contact) =>
      contact.id === contactId ? { ...contact, ...update } : contact
    );
  };


  export const updateContact = createAsyncThunk(
    'contact/updateContact',
    async ({ contactId, update }: UpdateContactArgs) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedContacts = updateContactInData(contactReviewData, contactId, update);
      return updatedContacts;
    }
  );

export const deleteContact = createAsyncThunk(
    'contact/deleteContact',
    async (contactId: number) => {
        await delay(contactReviewData);
        return contactId; // Devuelve el ID de la habitación a eliminar
    } 
);

interface ContactState {
    contacts: ContactType[],
    contact: ContactType | null,
    status: string,
    isloading: boolean,
    haserror: boolean,
    sortorder: string,
    active: boolean,
}
const initialState: ContactState = {
    contacts: [],
    contact: null,
    status: 'idle',
    isloading: false,
    haserror: false,
    sortorder: 'none',
    active: false,
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
        //   .addCase(createContact.pending, (state) => {
        //     state.status = 'loading';
        //     state.isloading = true;
        //   })
        //   .addCase(createContact.fulfilled, (state, action) => {
        //     state.contacts.push(action.payload);
        //     state.status = 'success';
        //   })
        //   .addCase(createContact.rejected, (state) => {
        //     state.haserror = true;
        //     state.status = 'failed';
        //   })
          .addCase(fetchContact.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(fetchContact.fulfilled, (state, action) => {
            state.contact = action.payload;
            state.status = 'success';
            state.isloading = false;
          })
          .addCase(fetchContact.rejected, (state) => {
            state.haserror = true;
            state.status = 'failed';
          })
          .addCase(updateContact.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(updateContact.fulfilled, (state, action) => {
            state.status = 'success';
            state.isloading = false;
            state.active = true;
            state.contacts = action.payload;
          })
          .addCase(updateContact.rejected, (state) => {
            state.haserror = true;
            state.status = 'failed';
          })
          .addCase(deleteContact.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(deleteContact.fulfilled, (state, action) => {
            state.status = 'success';
            state.isloading = false;
            state.contacts = state.contacts.filter(
              (contact) => contact.id !== action.payload
            );
          })
          .addCase(deleteContact.rejected, (state) => {
            state.haserror = true;
            state.status = 'failed';
          });
    }
})

export default roomSlice.reducer;