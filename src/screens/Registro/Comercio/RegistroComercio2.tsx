import { Formik, useField } from 'formik';
import react, { useEffect, useState } from 'react';
import {TextInput, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { PostComercio } from '../../../Servicies/ComercioService';
import * as ImagePicker from 'expo-image-picker';
import { registroComercioSchema2 } from '../../../../ValidateComercio';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';


type RootStackParamList = {
  RegistroComercio1: any;
  RegistroComercio2: any;
  RegistroComercio3: any;
};

export default function RegistroComercio2(){
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [imagen, setImagen] = useState<string[] | null>(null);
    const [nombre, setNombre] = react.useState("")
    const route = useRoute<RouteProp<RootStackParamList, 'RegistroComercio2'>>();
    const comercio = route.params?.comercio;

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
        telefono: "",
        web: "",
        facebook: "",
        instagram: "",
        provincia: "",
        direccion: ""
      }

      
      function nextStep(values: any){
        const data = {
          ...comercio,
          ...values
        };
        navigation.navigate('RegistroComercio3', { comercio: data});
      }


    return(
        <View style={{flex:1, paddingHorizontal: 20}}>
            <Formik style={{ width: '100%', height: '100%' }} initialValues={initialValues} onSubmit={(values: any) => { nextStep(values); }} validationSchema={registroComercioSchema2}>
                {({ handleSubmit, isValid, dirty }) => {
                    return (
                        <View style={{paddingHorizontal:15}}>
                        
                        <Text style={{marginLeft:10}}> Direccion </Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Direccion"
                            name={'direccion'}
                          />
                        </View>
                        <Text style={{marginLeft:10}}> Provincia </Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Provincia"
                            name={'provincia'}
                          />
                        </View>
                        <Text style={{marginLeft:10}}> Telefono </Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Teléfono"
                            name={'telefono'}
                            keyboardType="numeric"
                          />
                        </View>
                        <Text style={{marginLeft:10}}> Web </Text>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Web"
                            name={'web'}
                          />
                        </View>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Facebook"
                            name={'facebook'}
                          />
                        </View>
                        <View style={styles.horizontal}>
                          <FormikInputValue
                            placeholder="Instagram"
                            name={'instagram'}
                          />
                        </View>
                        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('RegistroComercio1');  
                                }}
                            >
                              <Icon name="chevron-left" size={50}></Icon>
                            </TouchableOpacity>
                              {isValid  && <TouchableOpacity
                                onPress={() => { handleSubmit() }} disabled={!isValid} 
                                style={{alignSelf:"flex-end"}}
                              >
                                <Icon name="chevron-right" size={50}></Icon>
                              </TouchableOpacity>}
                        </View>
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