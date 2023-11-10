import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookings from './BokkingData.json';

//Function to delay the loading data
const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(data)
        }, time)
    })
}

//Async functions
export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings',
    async () => {
        return await delay(bookings);
    } 
);
export const fetchBooking= createAsyncThunk(
    'bookings/fetchBooking',
    async (bookingId) => {
        const booking = bookings.find((booking) => booking.id === bookingId)
        console.log('Booking Data:', booking);
        return await delay(booking);
    } 
);
export const createBooking = createAsyncThunk(
    'bookings/createBooking',
    async (newBooking) => {
        const createBooking = await delay(newBooking)
        return createBooking;
    } 
);
export const updateBooking = createAsyncThunk(
    'bookings/updateBooking',
    async (bookingId, updatedBooking) => {
        const updated = await delay(updateBooking)
        return updated;
    } 
);
export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking',
    async (bookingId) => {
        await delay();
        return bookingId; // Devuelve el ID de la habitación a eliminar
    } 
);

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
    bookings: [],
    booking: null,
    status: 'idle',
    isloading: false,
    haserror: false,
    sortorder: 'none',
    },
    extraReducers:{
        [fetchBookings.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [fetchBookings.fulfilled] : (state, {payload}) => {
            state.bookings = payload
            state.status = 'success'
        },
        [fetchBookings.rejected] : (state, action) => {
            state.isloading = false
            state.haserror = true
            state.status = 'failed'
        },
        [createBooking.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [createBooking.fulfilled] : (state, {payload}) => {
            state.bookings.push(payload)
            state.status = 'success'
        },
        [createBooking.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [fetchBooking.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [fetchBooking.fulfilled] : (state, {payload}) => {
            state.booking = payload
            state.status = 'success'
        },
        [fetchBooking.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [updateBooking.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [updateBooking.fulfilled] : (state, {payload}) => {
            const index = state.bookings.findIndex(booking => booking.id === payload.id);
            if (index !== -1) {
                state.bookings[index] = payload;
            }
            state.status = 'success'
            state.isloading = false
        },
        [updateBooking.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
        [deleteBooking.pending] : (state, action) => {
            state.status = 'loading'
            state.isloading = true
        },
        [deleteBooking.fulfilled] : (state, {payload}) => {
            state.status = 'success';
            state.isloading = false;
            state.bookings = state.bookings.filter(booking => booking.id !== payload);
        },
        [deleteBooking.rejected] : (state, action) => {
            state.haserror = true
            state.status = 'failed'
        },
    }
})

export default bookingSlice.reducer;
