import { useRoute } from '@react-navigation/native';
import { GetSeguidoresByUserId, GetSeguidosByUserId, GetUsuarioById } from '../Servicies/UsuarioService/UsuarioServices';
import { useEffect, useState } from 'react';
import { CabeceraUsuarioWrap } from '../components/Usuario/UsuarioCabeceraWrap';
import { Button, StyleSheet, Image, Text, View } from 'react-native';
import NavegacionContenidoUsuario from '../components/Usuario/UsuarioNavegacionContenido';
import CabeceraUsuario from '../components/Usuario/UsuarioCabecera';
import userSingleton from '../Servicies/GlobalStates/UserSingleton';

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
  IdComercio: Array<Comercio>
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
  const [loadingFollow, setLoadingFollow] = useState<boolean>(true);
  const [esSeguido, setEsSeguido] = useState<boolean>(false);
  const [wrap, setWrap] = useState(false);
  const miUsuario = userSingleton.getUser();

  const scrollWrap = () => {
    if (!wrap) {
      setWrap(true);
    }
  }
  const scrollUnWrap = () => {
    setWrap(false);
  }

  useEffect(() => {
    if (id) {
          GetUsuarioById(id).then((data: any) => { 
            CrearUsuario(data)
            fetchFollow()
          });
    } else if (params?.id) {
      GetUsuarioById(params?.id).then((data: any) => { 
        CrearUsuario(data)
        fetchFollow()
      })
    }
  }, [])

  function fetchFollow(){
    if(miUsuario != null && miUsuario != undefined){
      GetSeguidosByUserId(miUsuario.id).then((res: any) => {
        if(res != null && res != undefined){
          if(res.$values[0].idseguido != null && res.$values[0].idseguido != undefined){
            if(res.$values[0].idseguido.$values != null && res.$values[0].idseguido.$values != undefined && res.$values[0].idseguido.$values.length > 0){
              let ids = res.$values[0].idseguido.$values.map((seguido: any) => seguido.id)
              setEsSeguido(ids.includes(id));
              setLoadingFollow(false)
            }else{
              setEsSeguido(false);
              setLoadingFollow(false)
            }
          }
        }
      })
    } 
  };

  function seguirButton(){
    setLoadingFollow(true);
    if(esSeguido){
    } else {
    }
  }

  return (
    <View style={styles.ventana}>
      {isLoading ?
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
        :
        <>
          {wrap ? <CabeceraUsuarioWrap User={User}></CabeceraUsuarioWrap> : <CabeceraUsuario User={User} />}

          <View style={{width: "90%", justifyContent: "center", alignSelf: "center", marginVertical: 5}}>
            {loadingFollow
            ?
              <Image source={require('../../assets/loading.gif')} style={{ height: 30, width: 30, justifyContent: 'center', alignSelf:"center"}}/>
            :
              <Button  
                title = {esSeguido ? "Dejar de seguir" : "Seguir"} 
                color= {esSeguido ? "gray" : "blue"} 
                onPress = {() => { (seguirButton())}} 
              />
            }

          </View>
          <NavegacionContenidoUsuario scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} User={User} />
        </>
      }
    </View>
  );

  function CrearUsuario(data: any) {
    const u: Usuario = {
      id: data.id,
      nombre: data.nombre,
      nickname: data.nickname,
      telefono: data.telefono ? data.telefono : undefined,
      imagenname: data.nombreimagen,
      Estado: data.estado ? data.estado: false,
      IdComercio: data.idcomercio,
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