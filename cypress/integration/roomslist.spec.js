describe('Listing Rooms', ()=> {
    it('shows rooms', () => {
        const room1 = 'ex';
        const room2 = 'non laboris';


        cy.visit('/home/rooms');
        cy.contains(room1);
        cy.contains(room2);
    });
})