import { useRoute } from '@react-navigation/native';
import { GetSeguidoresByUserId, GetSeguidosByUserId, GetUsuarioById, dejarSeguirUsuario, seguirUsuario } from '../Servicies/UsuarioService/UsuarioServices';
import { useEffect, useState } from 'react';
import { CabeceraUsuarioWrap } from '../components/Usuario/UsuarioCabeceraWrap';
import { Button, StyleSheet, Image, Text, View, Pressable } from 'react-native';
import NavegacionContenidoUsuario from '../components/Usuario/UsuarioNavegacionContenido';
import CabeceraUsuario from '../components/Usuario/UsuarioCabecera';
import userSingleton from '../Servicies/GlobalStates/UserSingleton';
import { SvgBackArrow, SvgFollow, SvgUnfollow } from '../components/Usuario/UserSVG';
import { SvgFixed } from '../components/Comercio/ComerciosSvg';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  id?: Number,
  closeModal: () => void,
  isLoggedUser?: boolean
}

export { Usuario }

export default function PerfilUsuarioExterno({ id, isLoggedUser, closeModal }: PerfilUsuarioExternoProps) {
  const route = useRoute();
  const params = route.params as PerfilUsuarioExternoProps | undefined;
  const [User, setUser]: any = useState<Usuario>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);
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

  function fetchFollow() {
    if (miUsuario != null && miUsuario != undefined) {
      GetSeguidosByUserId(miUsuario.id).then((res: any) => {
        if (res != null && res != undefined) {
          if (res.$values[0].idseguido != null && res.$values[0].idseguido != undefined) {
            if (res.$values[0].idseguido.$values != null && res.$values[0].idseguido.$values != undefined && res.$values[0].idseguido.$values.length > 0) {
              let ids = res.$values[0].idseguido.$values.map((seguido: any) => seguido.id)

              setEsSeguido(ids.includes(id ? id : params?.id));
              setLoadingFollow(false)
            } else {
              setEsSeguido(false);
              setLoadingFollow(false)
            }
          }
        }
      })
    }
  };

  function seguirButton() {
    console.log(esSeguido)
    if (miUsuario != null && miUsuario != undefined) {
      setLoadingFollow(true);
      if (esSeguido) {
        dejarSeguirUsuario(miUsuario.id, id ? id : params?.id).then(() => {
          fetchFollow();
        });
      } else {
        seguirUsuario(miUsuario.id, id ? id : params?.id).then(() => {
          fetchFollow();
        });
      }
    } else {
      console.log("usuario logueado no encontrado")
    }
  }

  return (
    <View style={styles.ventana}>
      {isLoading ?
        <View
          style={{
            marginTop: "5%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "",
          }}
        >
          <Image
            source={require("../../assets/loading.gif")}
            style={{ height: 40, width: 110 }}
          />
        </View>
      :
        <>
          <CabeceraUsuario User={User} loadingFollow={loadingFollow} esSeguido={esSeguido} seguirButton={seguirButton} closeModal={closeModal}/>

          <NavegacionContenidoUsuario isLoggedUser={isLoggedUser} scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} User={User} />
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
      Estado: data.estado ? data.estado : false,
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