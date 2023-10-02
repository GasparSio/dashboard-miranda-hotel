import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './App/store';

export class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
    // Verificar si la habitación está ocupada en la fecha proporcionada
    for (const booking of this.bookings) {
      if (booking.date === date) {
        return true;
      }
    }
    return false;
  }
}
// Ejemplo de uso de la clase Room
const room1 = new Room('Habitación 101', [{ date: '2023-10-02' }, { date: '2023-10-03' }], 2000, 10);
console.log(room1.isOccupied('2023-10-01')); // Devolverá false
console.log(room1.isOccupied('2023-10-02')); // Devolverá true



export class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  get fee() {
    // Calcula la tarifa total teniendo en cuenta el descuento en la habitación y el descuento en la reserva.
    const roomFee = this.room.pricePerNight * this.calculateNightCount();
    const discountAmount = (this.discount / 100) * roomFee;
    return roomFee - discountAmount;
  }

  calculateNightCount() {
    // Calcula la cantidad de noches entre el check-in y el check-out.
    const oneDay = 24 * 60 * 60 * 1000; // Un día en milisegundos
    const checkInDate = new Date(this.checkIn);
    const checkOutDate = new Date(this.checkOut);
    const nightCount = Math.round(
      Math.abs((checkInDate - checkOutDate) / oneDay) //Math.abs: valor absoluto de un número. 
    );
    return nightCount;
  }
}

// Ejemplo de uso
const roomData = {
  pricePerNight: 100,
};

const booking = new Booking(
  'Juan Pérez',
  'juan@example.com',
  '2023-10-10',
  '2023-10-15',
  10, // 10% de descuento
  roomData
);
console.log('Nombre:', booking.name);
console.log('Tarifa Total:', booking.fee);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





