import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const ServerRequestExample = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://propapi20231008104458.azurewebsites.net/api/Comercio');
      // Reemplaza 'https://tu-servidor.com/api/endpoint' con la URL real de tu servidor y endpoint.
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  useEffect(() => {
    // Realiza la solicitud cuando el componente se monta.
    fetchData();
  }, []);

  return (
    <View>
      <Text>Respuesta del servidor:</Text>
      {data ? (
        <Text>{JSON.stringify(data, null, 2)}</Text>
      ) : (
        <Text>Cargando...</Text>
      )}
      <Button title="Recargar" onPress={fetchData} />
    </View>
  );
};

export default ServerRequestExample;
