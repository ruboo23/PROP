import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ModalReseña from '../components/Comercio/Reseña/ModalReseña';
import * as reseñaService from '../Servicies/ReseñaService/reseñaService'
import Buscador from '../screens/Buscador';
import * as comercioSevice from '../Servicies/ComercioService/index';
import RegistroComercio from '../../ResgistroComercio';
import { GetAnuncioById } from '../Servicies/AnucioService/AnucioService';

jest.mock('../Servicies/ReseñaService/reseñaService');

describe('<Buscador />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Buscador />).toJSON();
    expect(tree.children.length).toBe(4);
  });
});

describe('<Buscador />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Buscador />).toJSON();
    expect(tree.children.length).toBe(4);
  });
});

describe('<ModalReseña />', () => {
  it('sube una reseña correctamente', async () => {
    // Configurar el estado inicial y las funciones necesarias para el componente
    const initialState = {
      titulo: 'Mi reseña',
      desc: 'Descripción de mi reseña',
      images: [], // Puedes ajustar según sea necesario
      puntuacion: 1,
    };

    // Renderizar el componente con el estado inicial
    const { getByText, getByTestId } = render(<ModalReseña close={() => {}} idComercio={1} />);

    // Simular el llenado del formulario con los datos iniciales
    fireEvent.changeText(getByTestId('titulo'), initialState.titulo);
    fireEvent.changeText(getByTestId('descripcion'), initialState.desc);
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

jest.mock('../Servicies/ComercioService/index');

describe('RegistroComercio', () => {
  it('sube un comercio correctamente', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    // Renderizar el componente
    const { getByPlaceholderText, getByText } = render(<RegistroComercio />);

    // Simular el llenado del formulario con datos válidos
    fireEvent.changeText(getByPlaceholderText('Nombre'), 'NombreComercio');
    fireEvent.changeText(getByPlaceholderText('Descripcion'), 'Descripción del comercio');
    fireEvent.changeText(getByPlaceholderText('Direccion'), 'Calle Principal 123');
    fireEvent.changeText(getByPlaceholderText('Provincia'), 'Ciudad');
    fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'correo@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'miContraseña');
    fireEvent.changeText(getByPlaceholderText('Horario'), '9:00 AM - 6:00 PM');
    fireEvent.changeText(getByPlaceholderText('Teléfono'), '123456789');
    fireEvent.changeText(getByPlaceholderText('Web'), 'http://www.ejemplo.com');
    fireEvent.changeText(getByPlaceholderText('Facebook'), 'facebook.com/ejemplo');
    fireEvent.changeText(getByPlaceholderText('Instagram'), 'instagram.com/ejemplo');

    // Simular el envío del formulario
    fireEvent.press(getByText('Registrarme'));

    // Esperar a que se complete el registro (ajusta esto según tu implementación)
    await waitFor(() => {
      // Verificar que la función PostComercio fue llamada con los datos esperados
      expect(comercioSevice.PostComercio).toHaveBeenCalledWith(
        // Pasa los datos esperados del comercio (ajusta según tus necesidades)
        expect.objectContaining({
          nombre: 'NombreComercio',
          descripcion: 'Descripción del comercio',
          direccion: 'Calle Principal 123',
          provincia: 'Ciudad',
          email: 'correo@gmail.com',
          contraseña: 'miContraseña',
          horario: '9:00 AM - 6:00 PM',
          telefono: '123456789',
          web: 'http://www.ejemplo.com',
          facebook: 'facebook.com/ejemplo',
          instagram: 'instagram.com/ejemplo',
          // ... otros campos del formulario
        })
      );
    });

    // Verificar que se muestra el mensaje de registro completado
    expect(consoleLogSpy).toHaveBeenCalledWith('Registro completado');
  });
});
