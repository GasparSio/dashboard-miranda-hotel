import React from 'react';
import { screen } from '@testing-library/react';
import { HamburgIcon } from './HamburgIcon';
import { colors } from '../theme';

//No esta terminado el test

describe('HamburgIcon', () => {
  it('debería renderizar con el color primaryRed cuando width es "75%"', () => {

    const button = screen.getByTestId('hamburg-icon');
    expect(button).toBeInTheDocument();

    // Comprueba el color del botón
    expect(button).toHaveStyle(`color: ${colors.primaryRed}`);
  });

  it('debería renderizar con el color correcto cuando width no es "75%"', () => {
    // Actualiza el estado inicial con un valor diferente para width

    // Comprueba que el componente se ha renderizado correctamente
    const button = screen.getByTestId('hamburg-icon');
    expect(button).toBeInTheDocument();

    // Comprueba el color del botón
    expect(button).toHaveStyle(`color: ${colors.filterGreenButton}`);
  });
});