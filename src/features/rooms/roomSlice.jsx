import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import rooms from './MOCK_DATA.json';

//Function to delay the loading data
const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(data)
        }, time)
    })
}

//Async functions
export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async () => {
        return await delay(rooms);
    } 
);
export const fetchRoom = createAsyncThunk(
    'rooms/fetchRoom',
    async (roomId) => {
        const roomById = rooms.find((room) => room.id === roomId)
        return await delay(roomById);
    } 
);
export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async (newRoom) => {
        const createdRoom = await delay(newRoom)
        return createdRoom;
    } 
);
export const updateRoom = createAsyncThunk(
    'rooms/updateRoom',
    async (roomId, updatedRoom) => {
        const updated = await delay(updateRoom)
        return updated;
    } 
);
export const deleteRoom = createAsyncThunk(
    'rooms/deleteRoom',
    async (roomId) => {
        await delay();
        return roomId; // Devuelve el ID de la habitación a eliminar
    } 
);

export const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
    rooms: [],
    room: null,
    status: 'idle',
    isloading: false,
    haserror: false,
    sortorder: 'none',
    },
    extraReducers:{
        [fetchRooms.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [fetchRooms.fulfilled] : (state, {payload}) => {
            state.rooms = payload
            state.status = 'success'
        },
        [fetchRooms.rejected] : (state, action) => {
            state.isloading = false
            state.haserror = true
            state.status = 'failed'
        },
        [createRoom.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [createRoom.fulfilled] : (state, {payload}) => {
            state.room.push(payload)
            state.status = 'success'
        },
        [createRoom.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [fetchRoom.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [fetchRoom.fulfilled] : (state, {payload}) => {
            state.room = payload
            state.status = 'success'
        },
        [fetchRoom.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [updateRoom.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [updateRoom.fulfilled] : (state, {payload}) => {
            const index = state.rooms.findIndex(room => room.id === payload.id);
            if (index !== -1) {
                state.rooms[index] = payload;
            }
            state.status = 'success'
            state.isloading = false
        },
        [updateRoom.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [deleteRoom.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [deleteRoom.fulfilled] : (state, {payload}) => {
            // Encuentra el índice de la habitación a eliminar por su ID
            const index = state.rooms.findIndex(room => room.id === payload);

            if (index !== -1) {
            // Elimina la habitación del array de habitaciones
            state.rooms.splice(index, 1);
            }

            state.status = 'success';
            state.isloading = false;
        },
        [deleteRoom.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
    }
})

export default roomSlice.reducer;