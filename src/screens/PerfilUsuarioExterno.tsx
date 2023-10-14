import { BackHandler, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import CabeceraUsuario from '../components/Usuario/UsuarioCabecera';
import { CabeceraUsuarioWrap } from '../components/Usuario/UsuarioCabeceraWrap';
import NavegacionContenidoUsuario from '../components/Usuario/UsuarioNavegacionContenido';
import { GetUsuarioById } from '../Servicies/UsuarioService/ususarioService';


interface UsuariosProp {
  id: number,
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
  IdSeguido: Array<number>,
  NumSeguidos: number,
  IdSeguidor: Array<number>,
  NumSeguidores: number
}

export { Usuario }

export default function PerfilUsuarioExterno({ id}: UsuariosProp) {
  let a = "";
  const [User, setUser] = useState<Usuario>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    GetUsuarioById(id).then((data: any) => { CrearUsuario(data) });
  }, [])
  const [wrap, setWrap] = useState(false);
  const scrollWrap = () => {
    if (!wrap) {
      setWrap(true);
    }
  }
  const scrollUnWrap = () => {
    setWrap(false);
  }

  const Seguir = () => {

  }
  return (
    <View style={styles.ventana}>
      {isLoading ?
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
        :
        <>
          {wrap ? <CabeceraUsuarioWrap User={User}></CabeceraUsuarioWrap> : <CabeceraUsuario User={User} />}
          <Button title="Seguir" onPress={(event) => {Seguir()}} disabled={true}></Button>
          <NavegacionContenidoUsuario scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} />
        </>
      }
    </View>
  );

  function CrearUsuario(data: any) {
    let NumSeguidores = data.IdSeguidor.$values.length
    let NumSeguidos = data.IdSeguido.$values.length
    const u: Usuario = {
      id: data.Id,
      nombre: data.Nombre,
      nickname: data.NickName,
      telefono: data.Telefono,
      imagenname: data.ImagenName,
      Estado: data.Estado,
      IdComercio: data.IdComercio,
      IdSeguido: data.IdSeguido,
      IdSeguidor: data.IdSeguidor,
      NumSeguidores: NumSeguidores,
      NumSeguidos: NumSeguidos
    }
    setUser(u);
    setIsLoading(false);
  }
}



const styles = StyleSheet.create({
  ventana: {
    height: '100%',
  }
});