import { StyleSheet, View, Image, TouchableOpacity, Text, Alert, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';
import { GetComercioById, GetComercioByName, editarNombreImagen } from '.././Servicies/ComercioService/index';
import { useRoute } from '@react-navigation/core';
import { GetAnuncioById } from '../Servicies/AnucioService/AnucioService';
import comercioSingleton from '../Servicies/GlobalStates/ComercioSingleton';
import * as ImagePicker from 'expo-image-picker';
import IUsuario from '../Interfaces/IUsuario';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userSingleton from '../Servicies/GlobalStates/UserSingleton';
import { useNavigation } from '@react-navigation/native';
import { ExisteReseña, GetReseñasByComercioId } from '../Servicies/ReseñaService/reseñaService';
import { ArrayDeDuplas } from '../components/Usuario/UsuarioCabecera';
import { UploadImageBucket } from '../Servicies/ImagenesService';
import { SvgEllipseViolet, SvgPlus } from '../components/Comercio/ComerciosSvg';
import ModalNovedad from '../components/Comercio/Anuncios/Novedad/ModalNovedad';
import ModalOferta from '../components/Comercio/Anuncios/Oferta/ModalOferta';
import ModalReseña from '../components/Comercio/Reseña/ModalReseña';

interface Anuncio {
  idcomercio: number,
  fecha: Date,
  titulo: string,
  descripcion: string,
  imagenes?: string,
  tipo: string,
  fechaini: Date,
  fechafin: Date
}

interface Reseña {
  usuario: number,
  comercio: number,
  descripcion: string,
  puntuacion: number,
  titulo: string,
  nombreimagen: string,
  fecha: Date,
  idUsuario: number,
  usuarioObject: IUsuario
}
type PerfilNavigationParams = {
  id: number;
  esComercioLogueado: boolean;
};

export default function PerfilComercio({ idComercio, esComercioLogueado, withCloseButton, closeAction }: any) {

  const route = useRoute();
  const params = route.params as PerfilNavigationParams | undefined;
  const id = idComercio || params?.id;
  const logueadoComoComercio = esComercioLogueado || params?.esComercioLogueado;
  const [comercio, setComercio] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const navigation = useNavigation();
  const [existeReseña, setExisteReseña] = useState<Boolean | undefined>(true);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [images, setImages] = useState<ArrayDeDuplas>([]);
  const [wrap, setWrap] = useState<boolean>(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const [fotosMaximas, setFotosMaximas] = useState(1)
  const [visibleButtonAdd, setVisibleButtonAdd] = useState(false);
  const [modalNovedadVisible, setModalNovedadVisible] = useState(false);
  const [modalOfertaVisible, setModalOfertaVisible] = useState(false);
  const [modalReseñaVisible, setModalReseñaVisible] = useState(false);

  function closeModalNovedad() {
    setModalNovedadVisible(false);
  }
  function closeOfertaNovedad() {
    setModalOfertaVisible(false);
  }
  function closeReseñaNovedad() {
    setModalReseñaVisible(false);
  }

  function mostrarModal() {
    Alert.alert('Ya has añadido una reseña a este comercio', 'No puedes añadir otra, aunque siempre puedes borrar la otra o editarla.', [
      { text: 'Aceptar', style: 'cancel' }
    ]);
  }

  const parseResponse = (res: any) => {
    if (res != null || res != undefined) {
      const c: any = {
        direccion: res?.direccion,
        descripcion: res?.descripcion,
        facebook: res?.facebook,
        horario: res?.horario,
        id: res?.id,
        nombreimagen: res?.nombreimagen,
        instagram: res?.instagram,
        mail: res?.mail,
        nombre: res?.nombre,
        provincia: res?.provincia,
        telefono: res?.telefono,
        web: res?.web,
        valoracionpromedio: res?.valoracionpromedio
      }
      if (c.ImagenNombre == null) {
        c.ImagenNombre = "predeterminado";
      }
      if (!logueadoComoComercio) {
        setComercio(c);
      } else {
        setComercio(comercioSingleton.getComercio());
      }
    }
  };

  useEffect(() => {
    setWrap(false);
    setIsLoading(true);
    (async () => {
      try {
        const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
      } catch (error) {
        console.error('Error al solicitar permisos:', error);
      }
    })();
    if (!!id) {
      GetComercioById(id).then((res: any) => {
        parseResponse(res)
      }).catch(e => console.log('Error cargando comercio: ', e));
    } else {
      GetComercioByName("Fitandrico").then((res: any) => { parseResponse(res); }).catch(e => console.log(e));
    }
    if (!!id) {
      if (userSingleton.getUser()?.id) {
        ExisteReseña(id)
          .then((existeReseña) => {
            setExisteReseña(existeReseña);
          })
          .catch((error) => {
            console.error("Error al verificar reseña:", error);
          });
      }
      GetReseñasByComercioId(id).then((res: any) => setReseñas(res)).catch(e => { console.log('Error cargando las reseñas de los comercios: ', e); });
      GetAnuncioById(id).then((res: any) => { setAnuncios(res); setIsLoading(false); }).catch(e => { console.log('Error cargando los anuncios del comercio: ', e); });
    } else {
      ExisteReseña(2).then((res: any) => { setExisteReseña(res); });
      GetReseñasByComercioId(2).then((res: any) => setReseñas(res));
      GetAnuncioById(2).then((res: any) => setAnuncios(res));
    }
  }, [id]);

  const scrollWrap = () => {
    if (!wrap) {
      setWrap(true);
    }
  }

  const scrollUnWrap = () => {
    if (wrap) {
      setWrap(false);
    }
  }

  function addImage(img: [string, string]) {
    setImages([img]);
  }

  function deleteImage() {
    setImages([]);
  }

  const pickImage = async () => {
    if (hasGalleryPermission) {
      if (images.length == fotosMaximas) {
        Alert.alert('Máximo de imágenes superado', 'No puedes añadir más de ' + fotosMaximas + ' imagenes', [
          { text: 'Aceptar', style: 'cancel' },
        ]);
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true
      });
      if (result && result.assets) {
        const newImage: [string, string] = [result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""];
        addImage(newImage);
      } else {
        // cancela  
        deleteImage();
      }
    } else {
      Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la galería.', [
        { text: 'Aceptar', style: 'cancel' },]);
    }
  }

  function pickImageForm() {
    Alert.alert('Elija fuente de datos', 'Seleccione una opción.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Desde galería', onPress: () => {
          pickImage();
        }
      },
      {
        text: 'Desde la cámara', onPress: () => {
          if (hasCameraPermission) {
            let result = ImagePicker.launchCameraAsync({
              base64: true
            }).then((result) => {
              if (result && result.assets) {
                const newImage: [string, string] = [result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""];
                addImage(newImage);
              }
            });
          } else {
            Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la cámara.', [
              { text: 'Aceptar', style: 'cancel' },]);
          }
        }
      },
    ]);
  }

  const handleSave = async () => {
    if (isEditingProfile) {
      if (images.length > 0) {
        let name;
        if(comercio.nombreimagen != null){
          name = comercio?.nombreimagen.trim();
        }else{
          name = comercio?.nickname?.trim();
          editarNombreImagen(comercio.id, name);
        }
        const imagen64 = images[0][1];
        deleteImage();
        await UploadImageBucket("Comercios", imagen64, name);
        setIsEditingProfile(false);
      } else {
        setIsEditingProfile(false);
      }
    }
    else {
      setIsEditingProfile(true);
    }
    setImages([]);
  }

  return (
    <View style={styles.ventana}>
      {isLoading
        ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/loading.gif')}
            style={{ height: 40, width: 110, overflow: 'visible' }}
          />
        </View>
        : <>
          {withCloseButton &&
            <TouchableOpacity onPress={closeAction} style={{ position: 'absolute', top: 30, left: 10, zIndex: 1000 }}>
              <Icon name='close' size={30} />
            </TouchableOpacity>
          }
          {logueadoComoComercio &&
            <>
              <TouchableOpacity
                style={{ backgroundColor: 'white', width: 68, padding: 10, borderRadius: 10, position: 'absolute', top: 30, right: 10, zIndex: 1, height: 40 }}
                onPress={() => {
                  try {
                    userSingleton.setUser(null)
                    // @ts-ignore
                    navigation.navigate('Login')
                  } catch (e) {
                    console.log('Error en singleton', e);
                  }
                }}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'white', width: 68, padding: 10, borderRadius: 10, position: 'absolute', top: 30, right: 80, zIndex: 1, height: 40 }} onPress={async () => { setIsEditingProfile(true); pickImageForm(); await handleSave(); deleteImage(); }}>
                <Text>Editar</Text>
              </TouchableOpacity>
            </>
          }
          {wrap ? <CabeceraComercioWrap imagen={comercio?.nombreimagen} nombre={comercio?.nombre} /> :
            <CabeceraComercio valoracionpromedio={comercio?.valoracionpromedio} telefono={comercio?.telefono} horario={comercio?.horario} imagen={comercio?.nombreimagen} nombre={comercio?.nombre} direccion={comercio?.direccion} descripcion={comercio?.descripcion} instagram={comercio?.instagram} facebook={comercio?.facebook} logueadoComoComercio={logueadoComoComercio} id={id} />}

          <NavegacionContenidoComercio imagenComercio={comercio?.nombreimagen} scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} reseñas={reseñas} idComercio={id} anuncios={anuncios}></NavegacionContenidoComercio>

          <TouchableOpacity onPress={() => {setVisibleButtonAdd(!visibleButtonAdd)}} style={{zIndex: 5}}>
            <View style={styles.absoluteContainer}>
              <SvgEllipseViolet style={{ position: 'absolute', bottom: 10, right: 0 }} height={53} width={53}></SvgEllipseViolet>
              <SvgPlus style={{ position: 'absolute', bottom: 18, right: 9 }} height={38.5} width={38.5}></SvgPlus>
            </View>
          </TouchableOpacity>

          {visibleButtonAdd &&
            <View style={[{ position: 'absolute', bottom: 55, right: 20, zIndex: 5 }]}>
              {
                logueadoComoComercio ?
                  <View>
                    <TouchableOpacity onPress={() => {console.log('modalNovedad'); setModalNovedadVisible(true)}} style={{ right: 30, bottom: 30, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#888DC7' }}>
                      <Text style={styles.option}>Novedad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalOfertaVisible(true)} style={{ right: 30, bottom: 30, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: '#888DC7' }}>
                      <Text style={styles.option}>Oferta</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <TouchableOpacity
                    style={{ right: 30, bottom: 30, borderRadius: 8, backgroundColor: '#888DC7' }}
                    onPress={() => {
                      if (existeReseña) {
                        mostrarModal();
                      } else {
                        setModalReseñaVisible(true)
                      }
                    }}>
                    <Text style={styles.option}>Reseña</Text>
                  </TouchableOpacity>
              }
            </View>
          }
          {modalNovedadVisible ?
            <ModalNovedad close={closeModalNovedad} idComercio={id ? id : 2} tipo={"Novedad"}></ModalNovedad>
            :
            <></>
          }
          {modalOfertaVisible ?
            <ModalOferta close={closeOfertaNovedad} idComercio={id ? id : 2} tipo={"Oferta"}></ModalOferta>
            :
            <></>
          }
          {modalReseñaVisible ?
            <ModalReseña close={closeReseñaNovedad} idComercio={id ? id : 2}></ModalReseña>
            :
            <></>
          }
        </>}
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    zIndex: 5
  },
  ventana: {
    height: '100%',
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    width: 100,
    textAlign: 'center',
    fontSize: 17,
    padding: 5,
    color: 'white',
  }
});
