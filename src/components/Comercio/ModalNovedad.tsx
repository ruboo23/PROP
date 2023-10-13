import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function ModalNovedad(props: any) {
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>(false);
  const [images, setImages] = useState<(string)[]>([""]);

  useEffect(()=> {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    if (hasGalleryPermission) {
      if (images.length == 3) {
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
        if (images[0] == "") {
          var aux = [result.assets[0].uri];
          setImages([...aux]);
        } else {
          var aux = images;
          aux.push(result.assets[0].uri);
          setImages([...aux]);
        }
        
      } else {
        // no se ha subido bien
      }    
    } else {
      // Ha rechazado el permiso de acceder a album
    }
   }

   function deleteImage(img : string) {
    Alert.alert('Eliminar', '¿Estás seguro de que deseas eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => {
        console.log('Eliminado')
        var aux = images.filter(valor => valor !== img);
        setImages([...aux]);
      } },
    ]);
   }

  return (      
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        style={styles.modal}
        onRequestClose={() => {
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text style={ [styles.modalTitle, { fontSize: 17, fontWeight: '600'}]}>Añadir novedad</Text>
            <TextInput style={styles.modalTitle}
              placeholder="Título"
              value={titulo}
              onChangeText={(t) => setTitulo(t)} >
            </TextInput>
            <TextInput style={[styles.modalDesc, { height: 120 }]}
              placeholder="Información que deseas compartir"
              value={desc}
              onChangeText={(t) => setDesc(t)}
              multiline={true} 
              numberOfLines={4} >
            </TextInput>
            <View style={{ flexDirection: 'row', }}>
            <Pressable
              style={[styles.addImage]}
              onPress={() => pickImage()}>
              <Text style={{textAlign: 'center', paddingTop: 6, paddingBottom: 6}}>Selecciona una imagen</Text>
            </Pressable>
            {(images[0] == "")  ? 
              <></>
            : 
              <View style={{ flexDirection: 'row', alignSelf: 'center', width: '100%', height: 50, paddingLeft: 5}}>
                {images.map((url, index) => (
                  <TouchableOpacity style={{ width: 40, height: 270, marginRight: 5 }} onPress={() => {deleteImage(url)}}>
                    <Image key={index} source={{uri: url}} alt={`Imagen ${index + 1}`} style={{ flex:1/7, width: 40, height: 40, marginRight: 5 }}/>
                  </TouchableOpacity>
                ))}
              </View>
            }
            </View> 
            <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
               <Pressable
              style={[styles.buttonClose, styles.buttonClose]}
              onPress={() => props.close() }>
                <Text style={styles.modalText}> Cancelar </Text>
              </Pressable>
              <Pressable
                style={[styles.buttonPub, styles.buttonPub]}
                onPress={() => props.close() }>
                <Text style={styles.modalText}> Publicar anuncio </Text>
              </Pressable>
            </View>
          </View>
        </View>          
      </Modal>
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
