import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import { createContext, useContext, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export function ImagePickerComercio(props: any) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);

  useEffect(()=> {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  function pickImageForm() {
    Alert.alert('Eliminar', '¿Estás seguro de que deseas eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Desde galería', onPress: () => {
        pickImage();
      } },
      { text: 'Desde la cámara', onPress: () => {
        if (hasCameraPermission) {
          let result = ImagePicker.launchCameraAsync().then((result) =>{ 
            if (result && result.assets) {
              props.addNewImg(result.assets[0].uri);
            }
          });
        } else {
          Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la cámara.', [
            { text: 'Aceptar', style: 'cancel' },  ]); 
        }
      }},
    ]); 
  }

  const pickImage = async () => {
    if (hasGalleryPermission) {
      if (props.images.length == 3) {
        Alert.alert('Máximo de imágenes superado', 'No puedes añadir más de tres imágenes', [
          { text: 'Aceptar', style: 'cancel' },
        ]);
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1
      });
      if (result && result.assets) {
        props.addNewImg(result.assets[0].uri);
      } else {
        // cancela  
      }    
    } else {
      Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la galería.', [
        { text: 'Aceptar', style: 'cancel' },  ]); 
    }
   }

   function deleteImage(img : string) {
    Alert.alert('Eliminar', '¿Estás seguro de que deseas eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => {
        props.deleteImage(img);
      } },
    ]);
   }

  return (      
    <View style={{ flexDirection: 'row', }}>
      <Pressable
        style={[styles.addImage]}
        onPress={() => pickImageForm()}>
          <Text style={{textAlign: 'center', paddingTop: 6, paddingBottom: 6}}>Selecciona una imagen</Text>
          </Pressable>
          {(props.images[0] == "")  ? 
            <></>
          : 
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '100%', height: 50, paddingLeft: 5}}>
              {props.images.map((url : string, index : number) => (
                <TouchableOpacity style={{ width: 40, height: 270, marginRight: 5 }} onPress={() => {deleteImage(url)}}>
                  <Image key={index} source={{uri: url}} alt={`Imagen ${index + 1}`} style={{ flex:1/7, width: 40, height: 40, marginRight: 5 }}/>
                </TouchableOpacity>
              ))}
            </View>
          }
    </View> 
           
  );
}

const styles = StyleSheet.create({
  addImage: {
    backgroundColor: '#E9E8E8',
    borderColor: 'grey',
    borderWidth: 0.5,
    width: 160,
    borderRadius: 5,
    marginBottom: 15
  },
  modalTitle: {
    height: 30,
    marginBottom: 10,
  },
  modalDesc: {
    height: 120,
    marginBottom: 15,
  },
  buttonClose: {
    backgroundColor: 'lightgrey',
    borderRadius: 7,
    marginRight: 70
  },
  buttonPub: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  modal: {
    elevation: 20,
    borderColor: 'grey',
    borderWidth: 0.5,
    backgroundColor: '#F0F0F0',
    width: '85%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 15,
    height: 365
  },
  modalText: {
    margin: 12,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    paddingRight: 10,
    backgroundColor: 'orange',
    width: 100,
    borderRadius: 7,
    marginRight: 10,
    marginBottom: 10
  },
  option: {
    width: 100,
    textAlign: 'center',
    fontSize: 17,
    padding: 5,
    color: 'black'
  }
});