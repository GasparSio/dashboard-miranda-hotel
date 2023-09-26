describe('Listing Rooms', ()=> {
    it('shows rooms', () => {
        const room1 = 'ex';
        const room2 = 'non laboris';


        cy.visit('/home/rooms');
        cy.contains(room1);
        cy.contains(room2);
    });
})


describe('Realizo un request', function(){
    it('si accedo a mi perfil sin estar registrado, me redirecciona al login', function(){
 cy.visit('https://asfan.as.com/perfil/?backURL=https%3A%2F%2Fas.com%2F%3Fevent_log%3Dokdesc%26prod%3DREG&v=pf')
        //Campo de email del formulario de la pagina del login
        cy.get('#Email1')
    })
})