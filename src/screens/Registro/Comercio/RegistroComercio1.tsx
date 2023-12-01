import { Formik, useField } from 'formik';
import react, { useEffect, useState } from 'react';
import {TextInput, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { PostComercio } from '../../../Servicies/ComercioService';
import * as ImagePicker from 'expo-image-picker';
import { registroComercioSchema1 } from '../../../../ValidateComercio';
import { useNavigation, NavigationProp  } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';


type RootStackParamList = {
  RegistroComercio1: any;
  RegistroComercio2: any;

};
interface Comercio {
  contraseña: string;
  descripcion: string;
  email: string;
  facebook: string;
  horario: string;
  nombre: string;
  provincia: string;
  telefono: number;
  instagram: string;
  direccion: string;
  web: string;
}
export default function RegistroComercio1(props: any){
  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const FormikInputValue = ({ name, ...props }: any) => {
        const [field, meta, helpers] = useField(name)
        return (
          <View>
            <TextInput
              style={[styles.input]}
              value={field.value ? field.value.toString(): ""}
              onChangeText={value => helpers.setValue(value)}
              {...props} />
            {meta.error && <Text style={{ paddingLeft: 15, marginTop: -30, marginBottom: 15, color: 'red' }}>{meta.error}</Text>}
          </View>
        )
      }

      const initialValues = {
        email: "",
        nombre: "",
        descripcion: "",
        contraseña: "",
      }

    function nextStep(values: any){
      if(values.contraseña != values.repetirContraseña){
        Alert.alert('Error', 'Las contraseñas no coinciden.', [
          { text: 'Aceptar', style: 'cancel' },]);
      }else{
      const data: Comercio = {
        ...values,
      };
      navigation.navigate('RegistroComercio2',  { comercio: data});
    }
    }

    return(
        <View style={{flex:1, paddingHorizontal: 20}}>
            <Formik style={{ width: '100%', height: '100%' }} initialValues={initialValues} onSubmit={(values: any) => { nextStep(values)}} validationSchema={registroComercioSchema1}>
                {({ handleSubmit, isValid, dirty }) => {
                    return (
                      <View style={{paddingHorizontal:15}}>
                        <Text style={{marginLeft:10}}> nombre</Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Nombre"
                            name={'nombre'}
                          />
                        </View>
                        <Text style={{marginLeft:10}}> Descripcion </Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Descripcion"
                            name={'descripcion'}
                            style={styles.desc}
                            multiline={true}
                          />
                        </View>
                        <Text style={{marginLeft:10}}> Correo electronico</Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Correo electrónico"
                            name={'email'}
                          />
                        </View>
                        <Text style={{marginLeft:10}}> Contraseña</Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Contraseña"
                            name={'contraseña'}
                            secureTextEntry={true}
                          />
                        </View>
                        <Text style={{marginLeft:10}}> repetir contraseña</Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="repetir Contraseña"
                            name={'repetirContraseña'}
                            secureTextEntry={true}
                          />
                    </View>
                    {isValid  && <TouchableOpacity
                        onPress={() => { handleSubmit() }} disabled={!isValid} 
                        style={{alignSelf:"flex-end"}}
                    >
                      <Icon name="chevron-right" size={50}></Icon>
                    </TouchableOpacity>}
                    <TouchableOpacity
                      onPress={() => { //@ts-ignore
                        navigation.navigate("Login");
                       }
                      }
                    >
                      <Text  style={styles.link}>¿Tienes ya una cuenta?</Text>
                      
                    </TouchableOpacity>
                </View>

          )
        }}
      </Formik>
      </View>
      );
}

const styles = StyleSheet.create({
    link: {
      color: 'blue',
      textAlign: 'center',
      textDecorationLine: 'underline',
      marginTop: 10,
    },
    switch: {
      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
      paddingTop: 20,
      paddingLeft: 10
    },
    botonDeshabilitado: {
      backgroundColor: 'lightgrey',
      borderRadius: 20,
      paddingBottom: 10,
      paddingTop: 10,
      paddingLeft: 50,
      paddingRight: 50,
      marginTop: 15
    },
    boton: {
      backgroundColor: '#d5fe40',
      borderRadius: 20,
      paddingBottom: 10,
      paddingTop: 10,
      paddingLeft: 50,
      marginTop: 15,
      width: 190,
      marginLeft: 10
    },
    horizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 35,
      borderColor: 'black',
      borderWidth: 1,
      marginBottom: 30,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 10,
      width: 300,
      textAlign: 'center',
    },
    desc: {
      height: 100,
      borderColor: 'black',
      borderWidth: 1,
      marginBottom: 30,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 20,
      width: 300,
      textAlign: 'center',
    },
  });