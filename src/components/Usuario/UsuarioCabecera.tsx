import { Alert, Text, TextInput } from "react-native";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import CabeceraComercio from "../Comercio/ComercioCabecera";
import { Usuario } from "../../screens/PerfilUsuario";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import userSingleton from "../../Servicies/GlobalStates/UserSingleton";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { GetSeguidoresByUserId, GetSeguidosByUserId } from "../../Servicies/UsuarioService/UsuarioServices";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UploadImageBucket } from "../../Servicies/ImagenesService";
import PerfilUsuarioOptions from "./PerfilUsuarioOptions";

interface CabeceraUsuarioProps {
    User: Usuario
}
export type DuplaDeString = [string, string];
export type ArrayDeDuplas = DuplaDeString[];
const CabeceraUsuario = ({User}: CabeceraUsuarioProps) => { 
    const [seguidores, setSeguidores] = useState<number>();
    const [seguidos, setSeguidos] = useState<number>();
    const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
    const [images, setImages] = useState<ArrayDeDuplas>([]);
    const currentUser = userSingleton.getUser();

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

    useEffect(() => {
        GetSeguidoresByUserId(User.id).then((res: any) => {
            if(res != null && res != undefined){
                if(res.$values[0].idseguidor != null && res.$values[0].idseguidor != undefined){
                    setSeguidores(res.$values[0].idseguidor.$values ? res.$values[0].idseguidor.$values.length : 0)
                }
              }
        })
        GetSeguidosByUserId(User.id).then((res: any) => {
            if(res != null && res != undefined){
                if(res.$values[0].idseguido != null && res.$values[0].idseguido != undefined){
                    setSeguidos(res.$values[0].idseguido.$values ? res.$values[0].idseguido.$values.length : 0)
                }
              }
        })
    }, [])
    
    const navigation = useNavigation();

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
        const name = User.imagenname.trim();
        const imagen64 = images[0][1];
        console.log('imagen: ', imagen64)
        console.log('name: ', name)
        await UploadImageBucket("Usuarios", imagen64, name);
        setIsEditingProfile(false);
      } else {
        setIsEditingProfile(false);
      }
    }
    else{
      setIsEditingProfile(true);
    }
  }
  console.log('imagenname: ', User.imagenname)
   return (
    <View style = {{flexDirection: 'row', justifyContent: "center"}}>
      <View style={styles.ContainerCabecera}>
          {isEditingProfile ?
          <>
              { images.length > 0 ?
                  <Image source={{uri: images[0][0]}} style={styles.Imagen} />
                  :
                  <View style={styles.EditarImagen}>
                      <TouchableOpacity onPress={()=> pickImageForm()}>
                          <Icon name='camera' size={30} />
                      </TouchableOpacity>
                  </View>
              }
          </>
          :
              <View>
                  <Image source={{uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Usuarios/${User.imagenname}`}} style={styles.Imagen}/>
              </View>
          }
          <View style={{marginHorizontal: 20,}}>

              <View style = {styles.container}>
                  <Text style={styles.TextNick}>{User.nickname}</Text>
              </View>

            <View style={styles.ContainerSeguidores}>
              <View style={{marginRight: 30, alignItems: "center"}}>
                  <Text style={{fontSize: 15, marginBottom: 5}}>Seguidores</Text>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>{seguidores}</Text>
              </View> 
              <View style={{alignItems:"center"}}>
                  <Text style={{fontSize: 15, marginBottom: 5}}>Seguidos</Text>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>{seguidos}</Text>
              </View>
            </View>

          </View>     

      </View>

      <View style = {{marginRight: 10}}>
        <PerfilUsuarioOptions></PerfilUsuarioOptions>
      </View>

    </View>

   )
}

const styles = StyleSheet.create({ 
    Imagen : {
        width: 90, 
        height: 90, 
        borderColor: 'black', 
        borderWidth: 1, 
        overflow: 'hidden', 
        borderRadius: 400
    },
    EditarImagen : {
        width: 90, 
        height: 90, 
        borderColor: 'black', 
        borderWidth: 1, 
        overflow: 'hidden', 
        borderRadius: 400,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey"
    },
    ContainerCabecera: {
        flexDirection: "row",
        marginBottom: 30,
        marginLeft: 10
    },
    TextNick :{
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
        marginRight: 50
    },
    TextInput: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
        marginRight: 50,
        width: 100
    },
    ContainerSeguidores: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 15,
    },   
    container: {
        flexDirection: 'row', 
        alignItems: 'center',

      },
});
export default CabeceraUsuario;