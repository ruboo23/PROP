import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ModalReseña from './ModalReseña';
import * as reseñaService from '../../../Servicies/ReseñaService/reseñaService';

// Mockear el servicio de reseña para simular el envío de la reseña
jest.mock('../../../Servicies/ReseñaService/reseñaService');

describe('<ModalReseña />', () => {
  it('sube una reseña correctamente', async () => {
    // Configurar el estado inicial y las funciones necesarias para el componente
    const initialState = {
      titulo: 'Mi reseña',
      desc: 'Descripción de mi reseña',
      images: [], // Puedes ajustar según sea necesario
      puntuacion: 3,
    };

    // Renderizar el componente con el estado inicial
    const { getByText } = render(<ModalReseña close={() => {}} idComercio={1} />);

    // Simular el llenado del formulario con los datos iniciales
    fireEvent.changeText(getByText('Define en unas palabra:'), initialState.titulo);
    fireEvent.changeText(getByText('Describe tu experiencia:'), initialState.desc);

    // TODO: Puedes simular la selección de imágenes si es necesario

    // TODO: Puedes simular la selección de la puntuación si es necesario

    // Simular la acción de publicar reseña
    fireEvent.press(getByText('Publicar'));

    // Esperar a que Jest ejecute la función asincrónica dentro de PostReseña
    await waitFor(() => {});

    // Verificar que la función PostReseña fue llamada con los datos esperados
    expect(reseñaService.PostReseña).toHaveBeenCalledWith(
      1, // idComercio
      initialState.titulo,
      initialState.desc,
      initialState.puntuacion + 1, // Puntuación incrementada en 1
      initialState.images
    );
  });
});
