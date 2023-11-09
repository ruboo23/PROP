import { useRoute } from '@react-navigation/native';
import { GetUsuarioById } from '../Servicies/UsuarioService/UsuarioServices';
import { useEffect, useState } from 'react';
import { CabeceraUsuarioWrap } from '../components/Usuario/UsuarioCabeceraWrap';
import { Button, StyleSheet, Text, View } from 'react-native';
import NavegacionContenidoUsuario from '../components/Usuario/UsuarioNavegacionContenido';
import CabeceraUsuario from '../components/Usuario/UsuarioCabecera';

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

interface PerfilUsuarioExternoProps {
  id: number
}

export { Usuario }

export default function PerfilUsuarioExterno({id}:PerfilUsuarioExternoProps) {
  const route = useRoute();
  const params = route.params as PerfilUsuarioExternoProps | undefined;
  const [User, setUser]: any = useState<Usuario>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
          GetUsuarioById(id).then((data: any) => { CrearUsuario(data) });
    } else if (params?.id) {
      GetUsuarioById(params?.id).then((data: any) => { CrearUsuario(data) })
    }
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
          <NavegacionContenidoUsuario scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} User={User} />
        </>
      }
    </View>
  );

  function CrearUsuario(data: any) {
    let NumSeguidores = data.idseguidor.$values.length
    let NumSeguidos = data.idseguido.$values.length
    const u: Usuario = {
      id: data.id,
      nombre: data.nombre,
      nickname: data.nickname,
      telefono: data.telefono ? data.telefono : undefined,
      imagenname: data.nombreimagen,
      Estado: data.estado ? data.estado: false,
      IdComercio: data.idcomercio,
      IdSeguido: data.idseguido,
      IdSeguidor: data.idseguidor,
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