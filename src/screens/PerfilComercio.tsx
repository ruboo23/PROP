import react from 'react';
import { StyleSheet, View,Image, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';
import { GetComercioById, GetComercioByName }  from '.././Servicies/ComercioService/index';
import { useRoute } from '@react-navigation/core';
import { GetAnuncioById } from '../Servicies/AnucioService/AnucioService';
import comercioSingleton from '../Servicies/GlobalStates/ComercioSingleton';
import * as ImagePicker from 'expo-image-picker';
import IUsuario from '../Interfaces/IUsuario';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userSingleton from '../Servicies/GlobalStates/UserSingleton';
import { useNavigation } from '@react-navigation/native';
import AñadirAnuncioButton from '../components/Comercio/Anuncios/AñadirAnuncioButton';
import { ExisteReseña, GetReseñasByComercioId } from '../Servicies/ReseñaService/reseñaService';
import { ArrayDeDuplas } from '../components/Usuario/UsuarioCabecera';
import { UploadImageBucket } from '../Servicies/ImagenesService';

interface Anuncio {
  idcomercio: number,
  fecha: Date,
  titulo: string,
  descripcion: string,
  imagenes?: string,
  tipo: string
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

export default function PerfilComercio({ idComercio, esComercioLogueado, withCloseButton, closeAction } : any) {
  
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
  
  useEffect(()=> {(async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const parseResponse = (res: any) => {
    if(res != null || res != undefined){
        const c : any = {
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
        if(!logueadoComoComercio){
          setComercio(c);
        } else {
          setComercio(comercioSingleton.getComercio());
        }
        setIsLoading(false);
      }
    };

  useEffect(() => {
    setWrap(false);
    setIsLoading(true);
    if(!!id){
      GetComercioById(id).then((res:any) => {
        parseResponse(res)}) 
    } else {
      GetComercioByName("Fitandrico").then((res:any) => {parseResponse(res);});   
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

  useEffect(() => {
    if(!!id){
      if (userSingleton.getUser()?.id) {
        ExisteReseña(id)
        .then((existeReseña) => {
          setExisteReseña(existeReseña);
        })
        .catch((error) => {
          console.error("Error al verificar reseña:", error);
        });
      }
      GetReseñasByComercioId(id).then((res:any) => setReseñas(res)).catch(e => { console.log(e); });
      GetAnuncioById(id).then((res:any) => {setAnuncios(res); console.log(res)}).catch(e => { console.log(e); });
    } else {
      ExisteReseña(2).then((res:any) => {setExisteReseña(res);});
      GetReseñasByComercioId(2).then((res:any) => setReseñas(res));
      GetAnuncioById(2).then((res:any) => setAnuncios(res));
    }
  }, [id, existeReseña]);

  function addImage (img : [string, string]) {
    setImages([img]);
}

function deleteImage () {
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
        aspect: [1,1],
        quality: 0.5,
        base64: true
      });
      if (result && result.assets) {
        const newImage : [string, string] = [result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""];
        addImage(newImage); 
      } else {
        // cancela  
        deleteImage();
      }    
    } else {
      Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la galería.', [
        { text: 'Aceptar', style: 'cancel' },  ]); 
    }
}

function pickImageForm() {
    Alert.alert('Elija fuente de datos', 'Seleccione una opción.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Desde galería', onPress: () => {
        pickImage();
      } },
      { text: 'Desde la cámara', onPress: () => {
        if (hasCameraPermission) {
          let result = ImagePicker.launchCameraAsync({
            base64: true
          }).then((result) =>{ 
            if (result && result.assets) {
              const newImage : [string, string] = [result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""];
              addImage(newImage);
            }
          });
        } else {
          Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la cámara.', [
            { text: 'Aceptar', style: 'cancel' },  ]); 
        }
      }},
    ]); 
  }

const handleSave = async () => {
  if(isEditingProfile){
    if (images.length > 0) {
      const name = comercio.nombreimagen.trim();
      const imagen64 = images[0][1];
      deleteImage();
      console.log('imagen: ', imagen64)
      console.log('name: ', name)
      await UploadImageBucket("Comercios", imagen64, name);
      setIsEditingProfile(false);
    } else {
      setIsEditingProfile(false);
    }
  }
  else{
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
            style={{ height: 80, width: 80 }}
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
                  style = {{backgroundColor: 'white', width: 68, padding: 10, borderRadius: 10, position: 'absolute', top: 30, right: 10, zIndex: 1, height: 40 }}
                      onPress={()=> {
                          userSingleton.setUser(null)
                          // @ts-ignore
                          navigation.navigate('Login')
                      }}
            >
            <Text>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{backgroundColor: 'white', width: 68, padding: 10, borderRadius: 10, position: 'absolute', top: 30, right: 80, zIndex: 1, height: 40 }} onPress={async () => {setIsEditingProfile(true); pickImageForm();  await handleSave(); deleteImage();}}>
              <Text>Editar</Text>
            </TouchableOpacity>
          </>
          }
          {wrap ? <CabeceraComercioWrap imagen={comercio?.nombreimagen} nombre={comercio?.nombre} /> :
          <CabeceraComercio valoracionpromedio={comercio?.valoracionpromedio} telefono={comercio?.telefono} horario={comercio?.horario} imagen={comercio?.nombreimagen} nombre={comercio?.nombre} direccion={comercio?.direccion} descripcion={comercio?.descripcion} instagram={comercio?.instagram} facebook={comercio?.facebook} logueadoComoComercio={logueadoComoComercio} id={id}/>}
          <NavegacionContenidoComercio scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} reseñas={reseñas} idComercio={id} anuncios={anuncios}></NavegacionContenidoComercio>
          <View style={styles.absoluteContainer}>
            <AñadirAnuncioButton id={comercio?.id} esComercio={logueadoComoComercio} permitir={existeReseña}/>
          </View>
        </>}
    </View>
    );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
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
  }
});
