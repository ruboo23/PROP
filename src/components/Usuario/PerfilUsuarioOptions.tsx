import { Alert, Text, TextInput } from "react-native";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import CabeceraComercio from "../Comercio/ComercioCabecera";
import { Usuario } from "../../screens/PerfilUsuario";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import userSingleton from "../../Servicies/GlobalStates/UserSingleton";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { GetSeguidoresByUserId, GetSeguidosByUserId } from "../../Servicies/UsuarioService/UsuarioServices";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UploadImageBucket } from "../../Servicies/ImagenesService";
import { Ionicons } from "@expo/vector-icons";

export type DuplaDeString = [string, string];
export type ArrayDeDuplas = DuplaDeString[];
export default function PerfilUsuarioOptions(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation()

  return (
    <View style={{ position: 'absolute', flexDirection: 'row'}}>
        
      <View>
        <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={30} color='black' onPress={() => {setIsOpen(!isOpen)}}/>
        </TouchableOpacity>
      </View>

      {isOpen && 
        <View style={styles.container}>
            <TouchableOpacity style = {styles.optionButton} 
                onPress={() => {
                    userSingleton.setUser(null)
                    //@ts-ignore          
                    navigation.navigate('Login')
            }}>
              <Text style={styles.option}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.optionButton}
                onPress={() => {
                  if(props.images.length > 0){
                    props.handleSave();
                  }else{
                    props.setIsEditingProfile(!props.isEditingProfile)
                  }
                }}
            >
              <Text style={styles.option}>{props.isEditingProfile ? props.images.length > 0 ? "Guardar" : "Cancelar" : "Editar Pefil"}</Text>
            </TouchableOpacity>
        </View>
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
    width: 70,
    borderRadius: 7,
    marginRight: 10,
    marginBottom: 10, 
    alignItems: 'flex-start',
    transform: [{translateX: -130}]
  },
  option: {
    width: 100,
    textAlign: 'center',
    fontSize: 17,
    color: 'white'
  },
  optionButton: {
    marginBottom: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
});
