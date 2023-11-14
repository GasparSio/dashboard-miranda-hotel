import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../util/fetchData';
import { fetchData } from '../../../util/fetchData';


export interface BookingType {
  guest: string,
  _id?: string,
  room_id?: string,
  order_date: string,
  check_in: string,
  check_out: string,
  special_request: string,
  room_type: string,
  status: string,
  photos: string,
  phone_number: string,
}

//Async functions
export const fetchBookings = createAsyncThunk<BookingType[], void>(
    'bookings/fetchBookings',
    async () => fetchData({ endpoint: 'bookings', method: 'GET' })
);
export const fetchBooking= createAsyncThunk(
  'bookings/fetchBooking',
  async (bookingId: string) => fetchData({ endpoint: `bookings/${bookingId}`, method: 'GET' })
);

export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking',
    async (bookingId: string) => {
      await fetchData({ endpoint: `bookings/${bookingId}`, method: 'DELETE'});
      return bookingId; 
    }
);
// export const createBooking = createAsyncThunk(
//     'bookings/createBooking',
//     async (newBooking) => {
//         const createBooking = await delay(newBooking)
//         return createBooking;
//     } 
// );
// export const updateBooking = createAsyncThunk(
//     'bookings/updateBooking',
//     async (updatedBooking: Booking): Promise<Booking> => {
//         const updated = await delay(updatedBooking)
//         return updated;
//     } 
// );

interface BookingsState {
    bookings: BookingType[],
    booking: BookingType | null,
    status: string,
    isloading: boolean,
    haserror: boolean,
}
const initialState: BookingsState = {
    bookings: [],
    booking: {} as BookingType,
    status: 'idle',
    isloading: false,
    haserror: false,
}
export const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
          builder.addCase(fetchBookings.pending, (state) => {
            state.status = 'pending';
            state.isloading = true;
          });
          builder.addCase(fetchBookings.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            state.bookings = action.payload;
            state.status = 'fulfilled';
            console.log('state.bookings', state.bookings);
          });
          builder.addCase(fetchBookings.rejected, (state, action) => {
            state.isloading = false;
            state.haserror = true;
            state.status = 'rejected';
          });
          builder.addCase(fetchBooking.pending, (state) => {
            state.status = 'pending';
            state.isloading = true;
          });
          builder.addCase(fetchBooking.fulfilled, (state, action: PayloadAction<BookingType>) => {
            state.booking = action.payload;
            state.status = 'fulfilled';
          });
          builder.addCase(fetchBooking.rejected, (state, action) => {
            state.haserror = true;
            state.status = 'rejected';
          });
          builder.addCase(deleteBooking.pending, (state) => {
            state.status = 'pending';
            state.isloading = true;
          });
          builder.addCase(deleteBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.isloading = false;
            state.bookings = state.bookings.filter(booking => booking._id !== action.payload);
          });
          builder.addCase(deleteBooking.rejected, (state, action) => {
            state.haserror = true;
            state.status = 'rejected';
          });
      //   builder.addCase(createBooking.pending, (state) => {
      //     state.status = 'loading';
      //     state.isloading = true;
      //   });
      //   builder.addCase(createBooking.fulfilled, (state, { payload }) => {
      //     state.bookings.push(payload);
      //     state.status = 'success';
      //   });
      //   builder.addCase(createBooking.rejected, (state, action) => {
      //     state.haserror = true;
      //     state.status = 'failed';
      //   });
      //   builder.addCase(updateBooking.pending, (state) => {
      //     state.status = 'loading';
      //     state.isloading = true;
      //   });
      //   builder.addCase(updateBooking.fulfilled, (state, action) => {
      //     const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
      //     if (index !== -1) {
      //         state.bookings[index] = action.payload;
      //     }
      //     state.status = 'success'
      //     state.isloading = false
      //   });
      //   builder.addCase(updateBooking.rejected, (state, action) => {
      //     state.haserror = true;
      //     state.status = 'failed';
      //   });
    }
})

export default bookingSlice.reducer;