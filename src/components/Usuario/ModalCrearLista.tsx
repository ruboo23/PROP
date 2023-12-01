import { StyleSheet, Text, View, TextInput, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert } from 'react-native';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ImagePickerComercio } from '../Comercio/Anuncios/ImagePickerComercio'
import { PostComercio } from '../../Servicies/ComercioService';
import { PostLista } from '../../Servicies/ListaService/ListaService';
import { UploadImageBucket } from '../../Servicies/ImagenesService';
import { StringSchema } from 'yup';





interface Lista {
  id: number
  nombre: string;
  descripcion: string,
  zona: string,
  tiempo: string
}

interface ModalListaProps {
  close: () => void;
  idUsuario: number;
  setLista: Dispatch<SetStateAction<Lista[]>>;
  Lista: Lista[];
}

export default function ModalLista({ setLista, close, Lista, idUsuario }: ModalListaProps) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [zona, setZona] = useState("");
  const [tiempo, setTiempo] = useState(0);



  useEffect(() => {
    (async () => {
      setTitulo("")
    })();
  }, []);

  function handleAnuncio() {
    if (titulo == "") {
      Alert.alert('Información necesaria', 'Escribe un titulo para tu nueva lista.', [
        { text: 'Aceptar', style: 'cancel' },
      ]);
    } else {
      const nuevaLista : Lista = {id: Lista[Lista.length - 1].id + 1, nombre: titulo, descripcion: descripcion, zona: zona, tiempo: tiempo}
      setLista([...Lista, nuevaLista]);
      PostLista(titulo, descripcion, tiempo, zona);

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
      <View style={[styles.centeredView, {backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', alignContent: 'center' }]}>
        <View style={styles.modal}>
          <Text style={[styles.modalTitle, { fontSize: 17, fontWeight: '600' }]}>Añadir Rutas</Text>
          <TextInput style={styles.inputTitulo}
            placeholder="Título"
            value={titulo}
            onChangeText={(t) => setTitulo(t)} >
          </TextInput>
          <TextInput style={styles.inputDesc}
            placeholder="Descripcion"
            value={descripcion}
            multiline={true}
            onChangeText={(t) => setDescripcion(t)} >
          </TextInput>
          <View style={{flexDirection:'row' }}>
            <TextInput style={styles.inputZona}
              placeholder="Zona"
              value={zona}
              onChangeText={(t) => setZona(t)} >
            </TextInput>

            <TextInput style={styles.inputZona}
              placeholder="Tiempo"
              value={tiempo}
              keyboardType='decimal-pad'              
              onChangeText={(t) => setTiempo(t)} >
            </TextInput>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            
            <Pressable
              style={[styles.buttonPub, styles.buttonPub]}
              onPress={() => { handleAnuncio(); }}>
              <Text style={styles.modalText}> Añadir lista </Text>
            </Pressable>
            <Pressable
              style={[styles.buttonClose, styles.buttonClose]}
              onPress={() => close()}>
              <Text style={[styles.modalText, {textDecorationLine: 'underline'}]}> Cancelar </Text>
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
    textAlign: 'center'
  },
  buttonClose: {
    backgroundColor: 'transparent',
    borderRadius: 7,
    width: '48%'
  },
  buttonPub: {
    backgroundColor: '#888DC7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: '48%'
  },
  modal: {
    elevation: 20,
    borderColor: 'black',
    borderWidth: 1.5,
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 15,
    height: 400

  },
  modalText: {
    margin: 12,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputDesc: {
    height: 120,
    borderColor: '#49688d',
    borderWidth: 1,
    marginLeft: 14,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: 250,
    textAlign: 'center',
  },
  inputZona: {
    height: 30,
    borderColor: '#49688d',
    borderWidth: 1,
    marginLeft: 14,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: 120,
    textAlign: 'center',
  },
  inputTitulo: {
    height: 30,
    borderColor: '#49688d',
    borderWidth: 1,
    marginLeft: 14,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: 250,
    textAlign: 'center',
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
