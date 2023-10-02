import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Para usar expect(...).toHaveStyle

import { Button } from './UserProfile'; 


test('Button should have correct background-color and color', () => {
    // Definir los valores esperados para background-color y color
    const expectedBackgroundColor = '#EBF1EF';
    const expectedColor = '#135846';
  
    // Renderizar el componente Button con las props deseadas
    const { getByText } = render(
      <Button backgroundColor={expectedBackgroundColor} color={expectedColor}>
        Edit
      </Button>
    );
  
    // Obtener el elemento del botón por su contenido de texto
    const buttonElement = getByText('Edit');
  
    // Comprobar si el botón tiene el background-color y color correctos
    expect(buttonElement).toHaveStyle(`
      background-color: ${expectedBackgroundColor};
      color: ${expectedColor};
    `);
  });