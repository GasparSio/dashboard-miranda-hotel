import { render , screen } from '@testing-library/react';
import { Bookings } from './Bookings';

describe('Testing Booking', () => {
    test('Guest be on the Screen', () => { 
        render( <Bookings/> )
        expect(screen.getByText('Bookings')).toBeInTheDocument()
     })
})
