import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { ImagePickerComercio } from '../Anuncios/ImagePickerComercio'; 
import ValoracionEstrellas from './ValoracionEstrellas';
import { ImagePickerReseña } from './ImagePickerReseña';
import { PostReseña } from '../../../Servicies/ReseñaService/reseñaService';

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
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 20, fontWeight: '600', paddingBottom: 10, paddingLeft: 5}}>Añadir reseña</Text>
            <ValoracionEstrellas value={1} onChangeRating={handleRatingChange}></ValoracionEstrellas>
            <TextInput style={[styles.input, { height: 35 }]}
              placeholder="Título"
              value={titulo}
              onChangeText={(t) => setTitulo(t)} >
            </TextInput>
            <TextInput style={[styles.input, { height: 120 }]}
              placeholder="Información que deseas compartir"
              value={desc}
              onChangeText={(t) => setDesc(t)}
              multiline={true} 
              >
            </TextInput>
            <ImagePickerReseña addNewImg={addImage} images={images} deleteImageP={deleteImage}></ImagePickerReseña>
            <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
               <Pressable
              style={[styles.buttonClose, styles.buttonClose]}
              onPress={() => close() }>
                <Text style={styles.modalText}> Cancelar </Text>
              </Pressable>
              <Pressable
                style={[styles.buttonPub, styles.buttonPub]}
                onPress={() => { handleReseña();} }>
                <Text style={styles.modalText}> Publicar reseña </Text>
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
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8', 
    borderRadius: 5,
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
    height: 550
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
