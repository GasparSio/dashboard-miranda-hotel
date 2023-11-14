import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../../util/fetchData';

export interface UsersType {
  _id?: string,
  photo: string,
  full_name: string,
  email: string,
  start_date: string,
  description: string,
  contact: string,
  status: string,
  phone_number: string,
}


//Async functions
export const fetchUsers = createAsyncThunk<UsersType[], any>(
    'users/fetchUsers',
    async () => fetchData({ endpoint: 'users', method: 'GET' })
);
export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (userId: string) => fetchData({ endpoint: `users/${userId}`, method: 'GET' })
);

// export const createUser = createAsyncThunk(
//     'users/createUser',
//     async (newUser) => {
//         const createdUser = await delay(newUser)
//         return createdUser;
//     } 
// );
// export const updateUser = createAsyncThunk(
//     'users/updateUser',
//     async (userId, updatedUser) => {
//         const updated = await delay(updateUser)
//         return updated;
//     } 
// );

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId: string) => {
      await fetchData({ endpoint: `users/${userId}`, method: 'DELETE'});
      return userId; 
    }
);


interface ContactState {
    users: UsersType[],
    user: UsersType | null,
    status: string,
    isloading: boolean,
    haserror: boolean,
}
const initialState: ContactState = {
    users: [],
    user: null,
    status: 'idle',
    isloading: false,
    haserror: false,
}

export const roomSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.status = 'pending';
            state.isloading = true;
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'fulfilled';
            state.isloading = false;
          })
          .addCase(fetchUsers.rejected, (state) => {
            state.isloading = false;
            state.haserror = true;
            state.status = 'rejected';
          })
          .addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'success';
          })
          //   .addCase(createUser.pending, (state) => {
          //     state.status = 'loading';
          //     state.isloading = true;
          //   })
          //   .addCase(createUser.fulfilled, (state, action) => {
          //     state.users.push(action.payload);
          //     state.status = 'success';
          //   })
          //   .addCase(createUser.rejected, (state) => {
          //     state.haserror = true;
          //     state.status = 'failed';
          //   })
          .addCase(fetchUser.rejected, (state) => {
            state.status = 'failed';
          })
          .addCase(deleteUser.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload);
            state.status = 'success';
          })
          .addCase(deleteUser.rejected, (state) => {
            state.haserror = true;
            state.status = 'failed';
          });
          //   .addCase(updateUser.pending, (state) => {
          //     state.status = 'loading';
          //     state.isloading = true;
          //   })
          //   .addCase(updateUser.fulfilled, (state, action) => {
          //     const index = state.users.findIndex((user) => user.id === action.payload.id);
          //     if (index !== -1) {
          //       state.users[index] = action.payload;
          //     }
          //     state.status = 'success';
          //     state.isloading = false;
          //   })
          //   .addCase(updateUser.rejected, (state) => {
          //     state.haserror = true;
          //     state.status = 'failed';
          //   })
      },
})

export default roomSlice.reducer;