import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from '../features/rooms/roomSlice';
import visualReducer from '../features/visual/visualSlice';
import bookingsReducer from '../features/bookings/bookingSlice';
import contactReducer from '../features/contact/contactSlice';
import usersReducer from '../features/users/userSlice';
import loginReducer from '../features/login/loginSlice';

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    visual: visualReducer,
    bookings: bookingsReducer,
    contact: contactReducer,
    users: usersReducer,
    login: loginReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;