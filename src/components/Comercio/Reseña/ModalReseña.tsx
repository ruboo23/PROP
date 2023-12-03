import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { ImagePickerComercio } from '../Anuncios/ImagePickerComercio'; 
import ValoracionEstrellas from './ValoracionEstrellas';
import { ImagePickerReseña } from './ImagePickerReseña';
import { PostReseña } from '../../../Servicies/ReseñaService/reseñaService';
import {SvgStar} from '../../Comercio/ComerciosSvg';

type DuplaDeString = [string, string];
type ArrayDeDuplas = DuplaDeString[];

interface ModalReseñaProps {
  close: () => void;
  idComercio: number;
}

export default function ModalReseña({ close, idComercio } : ModalReseñaProps) {
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<ArrayDeDuplas>([]);
  const [puntuacion, setPuntuacion] = useState(1);

  function addImage (img : [string, string]) {
    var aux = [...images, img];
    setImages(aux);
  }

  const handleRatingChange = (rating: number) => {
    setPuntuacion(rating);
  };

  function deleteImage (imgNombre : string) {
    const aux = images.filter((dupla) => dupla[0] !== imgNombre);
    setImages([...aux]);
  }

  useEffect(()=> {
    (async () => {
      setTitulo("");
      setDesc("");
    })();
  }, []);

  function handleReseña() {
    if (titulo == "" && desc == "") {
      Alert.alert('Información necesaria', '¿Quiere publicar una reseña sin texto?.',[       
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Publicar', onPress: () => {
          PostReseña(idComercio, titulo, desc, puntuacion+1, images);
          close();
        }}
      ]);
    } else {   
      PostReseña(idComercio, titulo, desc, puntuacion+1, images);
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
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', alignContent: 'center', paddingTop: '40%' }}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 20, fontWeight: '600', paddingBottom: 10, paddingLeft: 5}}>Añadir reseña</Text>
            <TextInput style={[styles.input, { height: 35 }]}
              placeholderTextColor={'grey'}
              scrollEnabled={false}
              placeholder="Define en unas palabra:"
              testID='titulo'
              value={titulo}
              onChangeText={(t) => setTitulo(t)} >
            </TextInput>
            <TextInput
              style={[styles.input, { height: 120 }]}
              placeholder="Describe tu experiencia:"
              value={desc}
              placeholderTextColor={'grey'}
              onChangeText={(t) => setDesc(t)}
              multiline={true} 
              testID='descripcion'             
            />
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: -35}}> 
              <Pressable
                style={styles.buttonPub}
                onPress={() => { handleReseña();} }>
                <Text style={[styles.modalText, { color: 'white' }]}> Publicar </Text>
              </Pressable>
              <Pressable
                style={styles.buttonClose}
                onPress={() => close() }>
                <Text style={[styles.modalText, { textDecorationLine: 'underline'}]}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>          
      </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white', 
    borderRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
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
    borderRadius: 7,
    marginLeft: '7%',
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
    height: 500
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
