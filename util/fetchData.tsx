import { BookingType } from "../src/features/bookings/bookingSlice";
import { ContactType } from "../src/features/contact/contactSlice";
import { RoomsType } from "../src/features/rooms/roomSlice";
import { UsersType } from "../src/features/users/userSlice";

export interface FetchDataParams {
    endpoint: string;
    method: string;
    body?: RoomsType | BookingType | UsersType | ContactType ;
    id?: string;
}

export const apiBaseUrl = import.meta.env.VITE_API_URL;

export const fetchData = async ({ endpoint, method, body }: FetchDataParams) => {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    method,
    mode: 'cors',
    headers: {
      token: `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const result = await response.json();
  return await result;
};