import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import CabeceraUsuario from '../components/Usuario/UsuarioCabecera';
import { CabeceraUsuarioWrap } from '../components/Usuario/UsuarioCabeceraWrap';

import NavegacionContenidoUsuario from '../components/Usuario/UsuarioNavegacionContenido';
import { GetUsuarioById } from '../Servicies/UsuarioService/UsuarioServices';
import { useRoute } from '@react-navigation/native';


interface UsuariosProp {
  id: number
}

interface Comercio {
  Descripcion: String,
  Direccion: String,
  Facebook?: String,
  Horario?: String,
  Id: 3,
  ImagenNombre: String,
  Instagram?: String,
  Mail?: String,
  Nombre: String,
  Provincia: String,
  Telefono?: number,
  Tipo?: [Object],
  Web?: String,
}

interface Usuario {
  id: Number
  nombre: string,
  nickname: string,
  telefono: string,
  imagenname: string,
  Estado: Boolean,
  IdComercio: Array<Comercio>,
  ComerciosSeguidos: Array<Comercio>
}

export { Usuario }

export default function PerfilUsuario({ id }: UsuariosProp) {
  const [User, setUser] = useState<Usuario>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => { GetUsuarioById(id).then((data: any) => { CrearUsuario(data) })}, [])

  return (
    <View style={styles.ventana}>
      {isLoading ?
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
        :
        <>
        {
          // @ts-ignore 
          <CabeceraUsuario User={User} />
          }
          <NavegacionContenidoUsuario User={User} />
        </>
      }
    </View>
  );

  function CrearUsuario(data: any) {
    let ComerciosSeguidos = data.idcomercio.$values
    const u: Usuario = {
      id: data.id,
      nombre: data.nombre,
      nickname: data.nickname,
      telefono: data.telefono ? data.telefono : undefined,
      imagenname: data.nombreimagen,
      Estado: data.estado ? data.estado : false,
      IdComercio: data.idcomercio,
      ComerciosSeguidos: ComerciosSeguidos
    }
    setUser(u);
    setIsLoading(false);
  }
}

const styles = StyleSheet.create({
  ventana: {
    height: '100%',
    paddingTop: 20,
    backgroundColor: 'white'
  }
});