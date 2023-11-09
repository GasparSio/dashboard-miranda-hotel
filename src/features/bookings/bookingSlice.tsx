import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bookingData } from './BookingData';

const bookingsData: BookingType[] = bookingData;

export interface BookingType {
    fullname: string,
    id: number,
    orderdate: string,
    checkin: string,
    checkout: string,
    specialrequest: string,
    roominfo: string,
    roomtype: string,
    status: string,
    price: string,
    photo: string
}

//Function to delay the loading data
const delay = (data: BookingType[] | BookingType, time: number = 200) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(data)
        }, time)
    })
}

//Async functions
export const fetchBookings = createAsyncThunk<BookingType[], void>(
    'bookings/fetchBookings',
    async (): Promise<BookingType[]> => {
        return await delay(bookingsData) as BookingType[];
    } 
);
export const fetchBooking= createAsyncThunk<BookingType, number>(
  'bookings/fetchBooking',
  async (bookingId: Number): Promise<BookingType> => {
      const booking: BookingType | undefined = bookingsData.find((booking) => booking.id === bookingId);

      if (booking !== undefined) {
          return await delay(booking) as BookingType;
      } else {
          throw new Error('No se encontró la reserva con el ID proporcionado');
      }
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
export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking',
    async (bookingId: number) => {
        await delay(bookingsData);
        return bookingId; // Devuelve el ID de la habitación a eliminar
    } 
);

interface BookingsState {
    bookings: BookingType[],
    booking: BookingType | null,
    status: string,
    isloading: boolean,
    haserror: boolean,
}
const initialState: BookingsState = {
    bookings: [],
    booking: null,
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
            state.status = 'loading';
            state.isloading = true;
          });
          builder.addCase(fetchBookings.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.status = 'success';
          });
          builder.addCase(fetchBookings.rejected, (state, action) => {
            state.isloading = false;
            state.haserror = true;
            state.status = 'failed';
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
          builder.addCase(fetchBooking.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          });
          builder.addCase(fetchBooking.fulfilled, (state, action: PayloadAction<BookingType>) => {
            state.booking = action.payload;
            state.status = 'success';
          });
          builder.addCase(fetchBooking.rejected, (state, action) => {
            state.haserror = true;
            state.status = 'failed';
          });
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
          builder.addCase(deleteBooking.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          });
          builder.addCase(deleteBooking.fulfilled, (state, action) => {
            state.status = 'success';
            state.isloading = false;
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
          });
          builder.addCase(deleteBooking.rejected, (state, action) => {
            state.haserror = true;
            state.status = 'failed';
          });
    }
})

export default bookingSlice.reducer;
