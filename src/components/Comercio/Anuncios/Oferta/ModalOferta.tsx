import { StyleSheet, Text, View, Modal, Pressable, Alert, TouchableNativeFeedback, } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { SubirAnuncio } from '../../../../Servicies/AnucioService/AnucioService'; 
import { ImagePickerReseña } from '../../Reseña/ImagePickerReseña';
import DateTimePicker from '@react-native-community/datetimepicker';

type DuplaDeString = [string, string];
type ArrayDeDuplas = DuplaDeString[];

interface ModalOfertaProps {
  close: () => void;
  idComercio: number;
  tipo: string,
}

export default function ModalOferta({ close, idComercio, tipo } : ModalOfertaProps) {
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<ArrayDeDuplas>([]);
  const [fechaIni, setFechaIni] = useState<Date>(new Date());
  const [fechaFin, setFechaFin] = useState<Date>(new Date());
  const [fechaIniModal, setFechaIniModal] = useState<boolean>(false);
  const [fechaFinModal, setFechaFinModal] = useState<boolean>(false);

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

  const renderFechaInicio = () => {
    const dia = fechaIni.getDate();
    const mes = fechaIni.getMonth() + 1; // Meses en JavaScript van de 0 a 11, por lo que sumamos 1.
    const año = fechaIni.getFullYear();

    // Agregar ceros a la izquierda si es necesario
    const diaString = dia < 10 ? `0${dia}` : dia.toString();
    const mesString = mes < 10 ? `0${mes}` : mes.toString();

    const fechaFormateada = `${diaString}/${mesString}/${año}`;    
    return (<View style={{ backgroundColor: 'white', alignSelf: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, width: '100%', height: 40 }}>
        <Text style={{ fontSize: 15, paddingTop: 8, paddingLeft: 5 }}>{fechaFormateada}</Text>
      </View>)
  };

  const renderFechaFin = () => { 
    const dia = fechaFin.getDate();
    const mes = fechaFin.getMonth() + 1; 
    const año = fechaFin.getFullYear();

    const diaString = dia < 10 ? `0${dia}` : dia.toString();
    const mesString = mes < 10 ? `0${mes}` : mes.toString();

    const fechaFormateada = `${diaString}/${mesString}/${año}`;    
    return (<View style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 1, borderRadius: 5, width: '100%', height: 40 }}>
        <Text style={{ fontSize: 15, paddingTop: 8, paddingLeft: 5 }}>{fechaFormateada}</Text>
      </View>)  
  };

  const onChangeIni = (event:any, selectedDate:  any) => {
    const currentDate = selectedDate;
    setFechaIniModal(false);
    setFechaIni(currentDate);
  };
  const onChangeFin = (event: any, selectedDate:  any) => {
    const currentDate = selectedDate;
    setFechaFinModal(false);
    setFechaFin(currentDate);
  };

  return (      
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        style={styles.modal}
        onRequestClose={() => {
        }}>
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', alignContent: 'center', paddingTop: '33%' }}>
          <View style={styles.modal}>
          <Text style={{ fontSize: 20, fontWeight: '600', paddingBottom: 10, paddingLeft: 5}}>Añadir oferta</Text>
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
            <View style={{ flexDirection: 'row', marginBottom: 25 }}>
            {fechaIniModal && 
              <DateTimePicker
                mode="date"
                minimumDate={new Date()}
                display='spinner'
                onChange={onChangeIni}
                value={fechaIni}
              ></DateTimePicker>
            }
            {fechaFinModal && 
              <DateTimePicker
                mode="date"
                minimumDate={fechaIni}
                display='spinner'
                onChange={onChangeFin}
                value={fechaFin}
              ></DateTimePicker>
            }
              <Pressable 
                style={{ width: '48%', marginRight: 12 }} 
                onPress={() =>{setFechaIniModal(true);}}
              >
                <Text style={{ marginBottom: 2 }}>Fecha de inicio</Text>
                {renderFechaInicio()}
              </Pressable>
              <Pressable style={{ width: '48%' }} onPress={()=>setFechaIniModal(true)}>
                <Text style={{ marginBottom: 2 }}>Fecha de finalización</Text>
                {renderFechaFin()}
              </Pressable>
            </View>
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
    height: 540
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
