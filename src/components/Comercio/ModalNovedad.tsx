import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function ModalNovedad(props: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>(false);
  const [images, setImages] = useState<string>("");

  useEffect(()=> {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    if (hasGalleryPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      });
      if (result && result.assets) {
        setImages(result.assets[0]?.uri);
        console.log(result.assets[0]?.uri);
      } else {
        // no se ha subido bien
      }    
    } else {
      // Ha rechazado el permiso de acceder a album
    }
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
            <TextInput style={styles.modalDesc}
              placeholder="Información que deseas compartir"
              value={desc}
              onChangeText={(t) => setDesc(t)}
              multiline={true} >
            </TextInput>
            <View style={{ flexDirection: 'row', }}>
            <Pressable
              style={[styles.addImage]}
              onPress={() => pickImage()}>
              <Text style={styles.modalText}>Selecciona una imagen</Text>
            </Pressable>
            {(images == "") ? 
              <></>
            : 
              <Image source={{uri: images}} style={{marginLeft: 10, flex:1/2, height:40}}></Image>
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
    width: 180,
    borderRadius: 5,
    marginBottom: 15
  },
  modalTitle: {
    height: 30,
    marginBottom: 10,
  },
  modalDesc: {
    height: 120,
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  buttonClose: {
    backgroundColor: 'lightgrey',
    borderRadius: 7,
    marginRight: 50
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
    width: '80%',
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
