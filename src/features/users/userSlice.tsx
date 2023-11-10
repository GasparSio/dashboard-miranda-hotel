import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usersData } from './UsersData';

const contactsData: UsersType[] = usersData;

export interface UsersType {
    photo: string,
    fullname: string,
    id: number,
    email: string,
    startdate: string,
    description: string,
    contact: string,
    status: string,
}

//Function to delay the loading data
const delay = (data: UsersType[] | UsersType, time: number = 200) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(data)
        }, time)
    })
}

//Async functions
export const fetchUsers = createAsyncThunk<UsersType[], any>(
    'users/fetchUsers',
    async (): Promise <UsersType[]> => {
        return await delay(contactsData) as UsersType[];
    } 
);
export const fetchUser = createAsyncThunk<UsersType, number>(
    'users/fetchUser',
    async (userId: number): Promise<UsersType> => {
        const userById: UsersType | undefined = contactsData.find((user) => user.id === userId)

        if (userById !== undefined) {
            return await delay(userById) as UsersType;
        } else {
            throw new Error('No se encontró la reserva con el ID proporcionado');
        }
    } 
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
    async (userId: number) => {
        await delay(contactsData);
        return userId; // Devuelve el ID de la habitación a eliminar
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
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'success';
            state.isloading = false;
          })
          .addCase(fetchUsers.rejected, (state) => {
            state.isloading = false;
            state.haserror = true;
            state.status = 'failed';
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
          .addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'success';
            state.isloading = false;
          })
          .addCase(fetchUser.rejected, (state) => {
            state.haserror = true;
            state.status = 'failed';
          })
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
          .addCase(deleteUser.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
            state.status = 'success';
            state.isloading = false;
          })
          .addCase(deleteUser.rejected, (state) => {
            state.haserror = true;
            state.status = 'failed';
          });
      },
})

export default roomSlice.reducer;