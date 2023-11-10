import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import ModalNovedad from './Novedad/ModalNovedad';
import ModalOferta from './Oferta/ModalOferta';
import React from 'react';
import ModalReseña from '../Reseña/ModalReseña';
import { useFocusEffect } from '@react-navigation/native';

interface AñadirButtonProps {
  id?: number,
  esComercio?: boolean,
  permitir?: Boolean
}

export default function AñadirAnuncioButton( {id, esComercio, permitir} : AñadirButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalNovedadVisible, setModalNovedadVisible] = useState(false);
  const [modalOfertaVisible, setModalOfertaVisible] = useState(false);
  const [modalReseñaVisible, setModalReseñaVisible] = useState(false);

  function closeModalNovedad () {
    setModalNovedadVisible(false);
  }
  function closeOfertaNovedad () {
    setModalOfertaVisible(false);
  }
  function closeReseñaNovedad () {
    setModalReseñaVisible(false);
  }

  useEffect(()=>{},[permitir]);

  function mostrarModal() {
    Alert.alert('Ya has añadido una reseña a este comercio', 'No puedes añadir otra, aunque siempre puedes borrar la otra o editarla.', [
      { text: 'Aceptar', style: 'cancel'}
    ]);
  }

  return (
    <View style={{alignItems: 'flex-end', paddingRight: 15, paddingBottom: 15}}>
      {isOpen && 
        <View style={styles.container}>
          {
          esComercio ?
          <>
            <TouchableOpacity onPress={() => setModalNovedadVisible(true)}>
              <Text style={styles.option}>Novedad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalOfertaVisible(true)}>
              <Text style={styles.option}>Oferta</Text>
            </TouchableOpacity>
          </>
          :
          <TouchableOpacity onPress={() =>{ 
            if (permitir) {
              mostrarModal();
            } else {
              setModalReseñaVisible(true)
            }}}>
            <Text style={styles.option}>Reseña</Text>
          </TouchableOpacity>
          }
        </View>
      }
      <TouchableOpacity>
        <Icon name="pluscircle" size={45} color='black' onPress={() => {setIsOpen(!isOpen)}}/>
      </TouchableOpacity>
      {modalNovedadVisible ? 
        <ModalNovedad close={closeModalNovedad} idComercio={id ? id : 2} tipo={"Novedad"}></ModalNovedad>
        :
        <></>
      }
      {modalOfertaVisible ? 
        <ModalOferta close={closeOfertaNovedad} idComercio={id ? id : 2} tipo={"Oferta"}></ModalOferta>
        :
        <></>
      }
      {modalReseñaVisible ? 
        <ModalReseña close={closeReseñaNovedad} idComercio={id ? id : 2}></ModalReseña>
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
    backgroundColor: 'black',
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
    color: 'white'
  }
});
