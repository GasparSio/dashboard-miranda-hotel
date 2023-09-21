import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import users from './UsersData.json';

//Function to delay the loading data
const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(data)
        }, time)
    })
}

//Async functions
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        return await delay(users);
    } 
);
export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (userId) => {
        const userById = users.find((user) => user.id === userId)
        return await delay(userById);
    } 
);
export const createUser = createAsyncThunk(
    'users/createUser',
    async (newUser) => {
        const createdUser = await delay(newUser)
        return createdUser;
    } 
);
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (userId, updatedUser) => {
        const updated = await delay(updateUser)
        return updated;
    } 
);
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        await delay();
        return userId; // Devuelve el ID de la habitación a eliminar
    } 
);

export const roomSlice = createSlice({
    name: 'users',
    initialState: {
    users: [],
    user: null,
    status: 'idle',
    isloading: false,
    haserror: false,
    sortorder: 'none',
    },
    extraReducers:{
        [fetchUsers.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [fetchUsers.fulfilled] : (state, {payload}) => {
            state.users = payload
            state.status = 'success'
        },
        [fetchUsers.rejected] : (state, action) => {
            state.isloading = false
            state.haserror = true
            state.status = 'failed'
        },
        [createUser.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [createUser.fulfilled] : (state, {payload}) => {
            state.user.push(payload)
            state.status = 'success'
        },
        [createUser.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [fetchUser.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [fetchUser.fulfilled] : (state, {payload}) => {
            state.user = payload
            state.status = 'success'
        },
        [fetchUser.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [updateUser.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [updateUser.fulfilled] : (state, {payload}) => {
            const index = state.users.findIndex(user => user.id === payload.id);
            if (index !== -1) {
                state.users[index] = payload;
            }
            state.status = 'success'
            state.isloading = false
        },
        [updateUser.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [deleteUser.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [deleteUser.fulfilled] : (state, {payload}) => {
            // Encuentra el índice de la habitación a eliminar por su ID
            const index = state.users.findIndex(user => user.id === payload);

            if (index !== -1) {
            // Elimina la habitación del array de habitaciones
            state.users.splice(index, 1);
            }
            state.status = 'success';
            state.isloading = false;
        },
        [deleteUser.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
    }
})

export default roomSlice.reducer;