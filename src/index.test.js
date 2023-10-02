import { Room } from './index'; 
import { Booking } from './index';

describe('Testing Room', () => {

    // Prueba para verificar si isOccupied funciona correctamente
    test('isOccupied devuelve true cuando la habitación está ocupada en una fecha dada', () => {
        const room = new Room('Habitación 101', [{ date: '2023-10-02' }, { date: '2023-10-03' }], 2000, 10);
        const isOccupied = room.isOccupied('2023-10-02');
        expect(isOccupied).toBe(true);
    });

    test('isOccupied devuelve false cuando la habitación no está ocupada en una fecha dada', () => {
        const room = new Room('Habitación 101', [{ date: '2023-10-02' }, { date: '2023-10-03' }], 2000, 10);
        const isOccupied = room.isOccupied('2023-10-01');
        expect(isOccupied).toBe(false);
    });

    // Prueba para verificar los tipos de datos de las propiedades de la clase Room
    test('name debe ser una cadena (string)', () => {
        const room = new Room('Habitación 101', [], 2000, 10);
        expect(typeof room.name).toBe('string');
    });

    test('bookings debe ser un array', () => {
        const room = new Room('Habitación 101', [], 2000, 10);
        expect(Array.isArray(room.bookings)).toBe(true);
    });

    test('rate debe ser un número entero (integer)', () => {
        const room = new Room('Habitación 101', [], 2000, 10);
        expect(Number.isInteger(room.rate)).toBe(true);
    });

    test('discount debe ser un número entero (integer)', () => {
        const room = new Room('Habitación 101', [], 2000, 10);
        expect(Number.isInteger(room.discount)).toBe(true);
    });
})


describe('Booking', () => {
    // Prueba el cálculo de la tarifa con un 10% de descuento en una habitación de $100 por noche.
    it('calculates fee correctly with 10% discount', () => {
    // Creamos una instancia de Booking con datos ficticios.
      const roomData = {
        name: 'Habitación Ejemplo',
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
  
      // La tarifa debería ser $450 después de aplicar el descuento.
      expect(booking.fee).toBe(450);
    });
  
    // Prueba el cálculo de la cantidad de noches entre dos fechas.
    it('calculates night count correctly', () => {
      const booking = new Booking(
        'Maria García',
        'maria@example.com',
        '2023-10-10',
        '2023-10-15',
        0, // Sin descuento
        null // No se necesita una habitación para esta prueba
      );
  
      // Debería haber 5 noches entre el 10 de octubre y el 15 de octubre.
      expect(booking.calculateNightCount()).toBe(5);
    });
  });