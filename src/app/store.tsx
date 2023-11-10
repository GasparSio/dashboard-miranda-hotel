import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from '../features/rooms/roomSlice';
import visualReducer from '../features/visual/visualSlice';
import bookingsReducer from '../features/bookings/bookingSlice';
import contactReducer from '../features/contact/contactSlice';
import usersReducer from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    visual: visualReducer,
    bookings: bookingsReducer,
    contact: contactReducer,
    users: usersReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;