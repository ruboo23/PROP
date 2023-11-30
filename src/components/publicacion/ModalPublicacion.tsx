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
          <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 15}}>Añadir publicación</Text>
            <TextInput 
              style={styles.input}
              placeholder="Añade un comentario"
              value={desc}
              onChangeText={(t) => setDesc(t)}
              multiline={true} 
              underlineColor="transparent"
            />
            <Text style = {{fontFamily: "Roboto", fontSize: 15, fontStyle: "normal", fontWeight: "400" , marginTop: 10, marginLeft: 15, marginBottom: 5}}>Menciona un comerico</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                placeholder={{
                  label: 'Selecciona Comercio...',
                  value: null,
                  color: "gray"
                }}
                items={comerciosSeguidos}
                onValueChange={(value: any) => setSelectedValue(value)}
                style={{
                  inputIOS: styles.pickerInput,
                  inputAndroid: styles.pickerInput,
                }}
              />
            </View>
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style = {{fontFamily: "Roboto", fontSize: 15, fontStyle: "normal", fontWeight: "400" , marginTop: 20, marginBottom: 5}}>Añadir imagen</Text>
              <ImagePickerReseña addNewImg={addImage} images={images} deleteImageP={deleteImage}></ImagePickerReseña>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: "space-between"}}>
            <Pressable
              style={styles.buttonPub}
              onPress={() => { handlePublicacion();} }>
              <Text style={[styles.modalText, [{color:"white"}]]}> Publicar </Text>
            </Pressable>
            <Pressable
               style={[styles.buttonClose]}
              onPress={() => close() }>
              <Text style={[styles.modalText, [{textDecorationLine: "underline"}]]}> Cancelar </Text>
            </Pressable>
          </View>
        </View>
      </View>          
    </Modal>
);
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1.2,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    height: 40, 
    justifyContent: 'center',
  },
  pickerInput: {
    fontSize: 16,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    height: 120,
    borderRadius: 10
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
  width: "50%",
  justifyContent: 'center',
  alignItems: 'center',
},
buttonPub: {
  width: "50%",
  backgroundColor: '#888DC7',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 7,
},
modal: {
  borderColor: 'black',
  borderWidth: 2,
  backgroundColor: '#F0F0F0',
  width: '90%',
  alignSelf: 'center',
  paddingHorizontal: 20,
  paddingVertical: 25,
  borderRadius: 10,
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
  backgroundColor: 'rgba(169, 169, 169, 0.6)'
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