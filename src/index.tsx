import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './App/store';
import App from './App';


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}else{
  console.error("Elemento 'root' no encontrado en el DOM.");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();






// ROOMS
interface Room {
  name: string;
  bookings: { date: string }[];
  rate: number;
  discount: number;
  isOccupied(date: string): boolean;
}

class RoomClass {
  name: string;
  bookings: { date: string }[];
  rate: number;
  discount: number;

  constructor(name: string, bookings: { date: string }[], rate: number, discount: number) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date: string): boolean {
    for (const booking of this.bookings) {
      if (booking.date === date) {
        return true;
      }
    }
    return false;
  }
}

// Ejemplo de uso de la clase Room
const room1 = new RoomClass('Habitación 101', [{ date: '2023-10-02' }, { date: '2023-10-03' }], 2000, 10);
console.log(room1.isOccupied('2023-10-01')); // Devolverá false
console.log(room1.isOccupied('2023-10-02')); // Devolverá true

// BOOKINGS
interface Booking {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  discount: number;
  room: Room;
  rate: number;
}

interface BookingData {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  discount: number;
  room: Room;
  rate: number;
}

class BookingClass {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  discount: number;
  room: Room;
  rate: number;

  constructor(data: BookingData) {
    this.name = data.name;
    this.email = data.email;
    this.checkIn = data.checkIn;
    this.checkOut = data.checkOut;
    this.discount = data.discount;
    this.room = data.room;
    this.rate = data.rate;
  }

  fee(): number {
    const checkInDate = new Date(this.checkIn);
    const checkOutDate = new Date(this.checkOut);

    const roomFee = this.rate * this.calculateNightCount(checkInDate, checkOutDate);
    const discountAmount = (this.discount / 100) * roomFee;
    return roomFee - discountAmount;
  }

  calculateNightCount(checkInDate: Date, checkOutDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const nightCount = Math.round(Math.abs((checkInDate.getTime() - checkOutDate.getTime()) / oneDay));
    return nightCount;
  }
}

// Ejemplo de uso
const roomData: { pricePerNight: number } = {
  pricePerNight: 100,
};

const bookingData: BookingData = {
  name: 'Juan Pérez',
  email: 'juan@example.com',
  checkIn: '2023-10-10',
  checkOut: '2023-10-15',
  discount: 10, // 10% de descuento
  room: room1,
  rate: 100, // Precio por noche
};

const booking = new BookingClass(bookingData);
console.log(booking.fee());
const checkInDate = new Date(bookingData.checkIn);
const checkOutDate = new Date(bookingData.checkOut);

console.log(booking.calculateNightCount(checkInDate, checkOutDate));
console.log(booking.room.isOccupied('2023-10-12'));
