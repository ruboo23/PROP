import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { ImagePickerReseña } from '../Comercio/Reseña/ImagePickerReseña';
import { PostPublicacion } from '../../Servicies/PublicacionService/PublicacionServices';
import { number } from 'yup';

import RNPickerSelect from 'react-native-picker-select';
import { GetUsuarioById } from '../../Servicies/UsuarioService/UsuarioServices';

type DuplaDeString = [string, string];
type ArrayDeDuplas = DuplaDeString[];

interface ModalReseñaProps {
  close: () => void;
  user: any
}

export default function ModalPublicacion({ close, user} : ModalReseñaProps) {
  const [titulo, setTitulo] = useState("");
  const [comercio, setComercio] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<ArrayDeDuplas>([]);
  const [puntuacion, setPuntuacion] = useState(1);
  const [comerciosSeguidos, setComercioSeguidos] = useState([{label: "", value: "", key: 0}]);
  const [selectedValue, setSelectedValue] = useState(null);

  function addImage (img : [string, string]) {
    var aux = [...images, img];
    setImages(aux);
  }

  function deleteImage (imgNombre : string) {
    const aux = images.filter((dupla) => dupla[0] !== imgNombre);
    setImages([...aux]);
  }

  useEffect(()=> {
    GetUsuarioById(user.id).then((res:any)=>{
      let data
      if(res != null && res != undefined && res.idcomercio.$values.length > 0){
        data = res.idcomercio.$values.map((item : any) => ({
          key: item.id,
          value: item.id,
          label: item.nombre
        }))
       }else{
         data = []
       }
      setComercioSeguidos(data);
    });
    (async () => {
      setTitulo("");
      setDesc("");
    })();
  }, []);

  function handlePublicacion() {
    if(selectedValue != null && selectedValue > 0){
      if (titulo == "" && desc == "") {
        Alert.alert('Información necesaria', '¿Quiere publicar una reseña sin texto?.',[       
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Publicar', onPress: () => {

            PostPublicacion(selectedValue, titulo, desc, images).then(
              (res: any) => {
                Alert.alert('Alerta', res,[       
                  { text: 'Aceptar', style: 'cancel' },
                ]);
              }
            );
            close();
          }}
        ]);
      } else {   
        PostPublicacion(selectedValue, titulo, desc, images).then(
          (res: any) => {
            Alert.alert('Alerta', res,[       
              { text: 'Aceptar', style: 'cancel' },
            ]);
          }
        );
        close();
      }
    } else {
        Alert.alert('Información necesaria', 'Es necesario seleccionar un comercio (en el seleccionable sale los comercios seguidos!)',[       
        { text: 'Aceptar', style: 'cancel' },
      ]);
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
          <Text style={{ fontSize: 20, fontWeight: '600', paddingBottom: 10, paddingLeft: 5}}>Añadir publicacion</Text>
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
          <RNPickerSelect
            placeholder={{
              label: 'Selecciona Comercio...',
              value: null,
            }}
            items={comerciosSeguidos}
            onValueChange={(value: any) => setSelectedValue(value)}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                color: 'black',
                paddingRight: 30, 
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: 'purple',
                borderRadius: 8,
                color: 'black',
                paddingRight: 30, // para asegurar que el texto no esté detrás del ícono
              },
            }}
          />
          <ImagePickerReseña addNewImg={addImage} images={images} deleteImageP={deleteImage}></ImagePickerReseña>
          <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
             <Pressable
            style={[styles.buttonClose, styles.buttonClose]}
            onPress={() => close() }>
              <Text style={styles.modalText}> Cancelar </Text>
            </Pressable>
            <Pressable
              style={[styles.buttonPub, styles.buttonPub]}
              onPress={() => { handlePublicacion();} }>
              <Text style={styles.modalText}> Publicar </Text>
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