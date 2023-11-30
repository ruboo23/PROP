import { StyleSheet, Text, View, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { ImagePickerComercio } from '../ImagePickerComercio';
import { SubirAnuncio } from '../../../../Servicies/AnucioService/AnucioService'; 
import { ImagePickerReseña } from '../../Reseña/ImagePickerReseña';

type DuplaDeString = [string, string];
type ArrayDeDuplas = DuplaDeString[];

interface ModalNovedadProps {
  close: () => void;
  idComercio: number;
  tipo: string,
}

export default function ModalNovedad({ close, idComercio, tipo } : ModalNovedadProps) {
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<ArrayDeDuplas>([]);

  function addImage (img : [string, string]) {
    var aux = [...images, img];
    setImages(aux);
  }

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

  function handleAnuncio() {
    if (titulo == "" || desc == "") {
      Alert.alert('Información necesaria', 'El anuncio que suba debe tener tanto título como descripción. Las imágenes son opcionales y como máximo 3.',[       
        { text: 'Aceptar', style: 'cancel' },
      ]);
    } else {   
      SubirAnuncio(idComercio, new Date(), titulo, desc, images, tipo);
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
          <Text style={{ fontSize: 20, fontWeight: '600', paddingBottom: 10, paddingLeft: 5}}>Añadir novedad</Text>
            <TextInput style={[styles.modalInput, { height: 40 }]}
              placeholder="Título"
              value={titulo}
              onChangeText={(t) => setTitulo(t)} >
            </TextInput>
            <TextInput style={[styles.modalInput, { height: 120 }]}
              placeholder="Información que deseas compartir"
              value={desc}
              onChangeText={(t) => setDesc(t)}
              multiline={true} 
              numberOfLines={4} >
            </TextInput>
            <ImagePickerReseña addNewImg={addImage} images={images} deleteImageP={deleteImage}></ImagePickerReseña>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: -35}}> 
              <Pressable
                style={styles.buttonPub}
                onPress={() => { handleAnuncio();} }>
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
  modalInput: {
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
    height: 460
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
