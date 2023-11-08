import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

type DuplaDeString = [string, string];
type ArrayDeDuplas = DuplaDeString[];

interface ImagePickerComercioProps {
  addNewImg: (img : [string, string]) => void;
  images: ArrayDeDuplas;
  deleteImageP: (imgNombre : string) => void;
}

export function ImagePickerReseña({ addNewImg, images, deleteImageP } : ImagePickerComercioProps) {
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
    Alert.alert('Elija fuente de datos', 'Seleccione una opción.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Desde galería', onPress: () => {
        pickImage();
      } },
      { text: 'Desde la cámara', onPress: () => {
        if (hasCameraPermission) {
          let result = ImagePicker.launchCameraAsync({
            base64: true,
            quality: 0.5
          }).then((result) =>{ 
            if (result && result.assets) {
              const newImage : [string, string] = [result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""];
              addNewImg(newImage);
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
      if (images.length == 4) {
        Alert.alert('Máximo de imágenes superado', 'No puedes añadir más de cuatro imágenes', [
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
        addNewImg(newImage); 
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
        deleteImageP(img);
      } },
    ]);
  }

  return (
    <View style={{height: 160}}>
    <Pressable style={styles.addImage} onPress={pickImageForm}>
      <Text style={styles.addImageText}>Seleccione una imagen</Text>
    </Pressable>
    <View style={{ flexDirection: 'row', alignSelf: 'center', width: '100%', height: 50}}>
      {images.map((dupla : DuplaDeString, index : number) => (
        <TouchableOpacity style={{ width: 40, height: 270, marginRight: 34 }} onPress={() => {deleteImage(dupla[0])}}>
          <Image key={dupla[1]} source={{uri: dupla[0]}} alt={`Imagen ${index + 1}`} style={{ flex:1/3.6, width: 70, height: 70 }}/>
        </TouchableOpacity>
      ))}
    </View>
  </View> 
  );
}

const styles = StyleSheet.create({
  addImage: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5
  },
  addImageText: {
    textAlign: 'center',
    paddingTop: 6,
    paddingBottom: 6,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '50%', // 2 columnas
    padding: 5,
  },
  image: {
    width: '100%',
    height: 130,
    aspectRatio: 1, // Mantener la relación de aspecto
  },
  addImage2: {
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
