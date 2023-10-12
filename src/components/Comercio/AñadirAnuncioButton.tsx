import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import ModalNovedad from './ModalNovedad';

export default function AñadirAnuncioButton(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalNovedadVisible, setModalNovedadVisible] = useState(false);
  const [modalOfertaVisible, setModalOfertaVisible] = useState(false);

  function closeModalNovedad () {
    setModalNovedadVisible(false);
  }

  return (
    <View style={{alignItems: 'flex-end', paddingRight: 15, paddingBottom: 15}}>
      {isOpen ? 
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setModalNovedadVisible(true)}>
            <Text style={styles.option}>Novedad</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalOfertaVisible(true)}>
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
      {modalNovedadVisible ? 
        <ModalNovedad close={closeModalNovedad}></ModalNovedad>
        :
        <></>
      }
      {modalOfertaVisible ? 
        <ModalNovedad close={closeModalNovedad}></ModalNovedad>
        :
        <></>
      }
    </View>
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
    height: 330
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
