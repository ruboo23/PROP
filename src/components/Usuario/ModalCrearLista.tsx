import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { ImagePickerComercio } from '../Comercio/Anuncios/ImagePickerComercio' 

type DuplaDeString = [string, string];
type ArrayDeDuplas = DuplaDeString[];

interface ModalListaProps {
  close: () => void;
  idUsuario: number;
}

export default function ModalLista({ close, idUsuario } : ModalListaProps) {
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<ArrayDeDuplas>([]);


  function addImage (img : [string, string]) {
    setImages([img]);
  }

  function deleteImage () {
    setImages([]);
  }

  useEffect(()=> {
    (async () => {
      setTitulo("");
      setDesc("");
    })();
  }, []);

  function handleAnuncio() {
    if (titulo == "" || desc == "") {
      Alert.alert('Información necesaria', 'Excribe un titulo para tu nueva lista, pudes subir una foto que será colocada como portada.',[       
        { text: 'Aceptar', style: 'cancel' },
      ]);
    } else {
      //SubirAnuncio(idComercio, new Date(), titulo, desc, images, tipo);
      close();
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
            <Text style={ [styles.modalTitle, { fontSize: 17, fontWeight: '600'}]}>Añadir Lista</Text>
            <TextInput style={styles.modalTitle}
              placeholder="Título"
              value={titulo}
              onChangeText={(t) => setTitulo(t)} >
            </TextInput>
            <ImagePickerComercio addNewImg={addImage} images={images} deleteImageP={deleteImage} numeroDeFotos={1}></ImagePickerComercio>
            <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
               <Pressable
              style={[styles.buttonClose, styles.buttonClose]}
              onPress={() => close() }>
                <Text style={styles.modalText}> Cancelar </Text>
              </Pressable>
              <Pressable
                style={[styles.buttonPub, styles.buttonPub]}
                onPress={() => { handleAnuncio();} }>
                <Text style={styles.modalText}> Añadir nueva lista </Text>
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
    height: 225
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
