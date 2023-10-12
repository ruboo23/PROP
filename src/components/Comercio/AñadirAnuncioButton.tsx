import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-paper';


export default function AñadirAnuncioButton(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <View style={{alignItems: 'flex-end', paddingRight: 15, paddingBottom: 15}}>
      {isOpen ? 
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.option}>Novedad</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.option}>Oferta</Text>
          </TouchableOpacity>
        </View>
      :
        <View style={{ width: 100, height: 76}}>
        </View>
      }
      <TouchableOpacity>
        <Icon name="pluscircle" size={40} color='orange' onPress={() => {setIsOpen(!isOpen)}}></Icon>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}
        onRequestClose={() => {
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <TextInput style={styles.modalTitle}
              placeholder="Título"
              value={titulo}
              onChangeText={(t) => setTitulo(t)}
              >
            </TextInput>
            <TextInput style={styles.modalDesc}
              placeholder="Información que deseas compartir"
              value={desc}
              onChangeText={(t) => setDesc(t)}
              multiline={true}
              >
            </TextInput>
            
            <Pressable
              style={[styles.buttonClose, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalText}> Publicar anuncio </Text>
            </Pressable>
          </View>
        </View>          
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    height: 30,
    marginBottom: 15
  },
  modalDesc: {
    height: 120,
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  buttonClose: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 270
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
