import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PostUsuario } from './src/Servicies/UsuarioService/UsuarioServices';
import { Formik, useField, useFormik } from 'formik';
import { registroComercioSchema } from './ValidateComercio';
import { PostComercio } from './src/Servicies/ComercioService';



function RegistroComercio() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);

  


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

  const initialValues = {
    email: "",
    nombre: "",
    descripcion: "",
    contraseña: "",
    horario: "",
    telefono: "",
    web: "",
    facebook: "",
    instagram: "",
    provincia: "",
    direccion: ""
  }
  const FormikInputValue = ({ name, ...props }: any) => {
    const [field, meta, helpers] = useField(name)
    return (
      <View>
        <TextInput
          style={[styles.input]}
          value={field.value.toString()}
          onChangeText={value => helpers.setValue(value)}
          {...props} />
        {meta.error && <Text style={{ paddingLeft: 15, marginTop: -30, marginBottom: 15, color: 'red' }}>{meta.error}</Text>}
      </View>
    )
  }

  

  async function subirComercio(values: Comercio) {
      PostComercio(values)
      console.log("Registro completado")
       
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", backgroundColor: "white", paddingVertical: 40 }}>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Image
          source={require('./assets/proppropprop.png')}
          style={{ width: 200, height: 80, marginLeft: 30 }}
        />
      </View>
      <Formik style={{ width: '100%', height: '100%' }} initialValues={initialValues} onSubmit={(values: Comercio) => { subirComercio(values) }}>
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <View style={{ alignItems: 'center' }}>
              <View style={styles.horizontal}>
                <IconFontAwesome name='user-circle-o' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Nombre"
                  name={'nombre'}
                />
              </View>
              <View style={styles.horizontal}>
                <IconFontAwesome name='file-text' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Descripcion"
                  name={'descripcion'}
                  style={styles.desc}
                  multiline={true}
                />
              </View>
              <View style={styles.horizontal}>
                <IconMaterialIcons name='place' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Direccion"
                  name={'direccion'}
                />
              </View>
              <View style={styles.horizontal}>
                <IconMaterialIcons name='place' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Provincia"
                  name={'provincia'}
                />
              </View>
              <View style={styles.horizontal}>
                <IconEntypo name='mail-with-circle' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Correo electrónico"
                  name={'email'}
                />
              </View>
              <View style={styles.horizontal}>
                <IconMaterialCommunityIcons name='onepassword' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Contraseña"
                  name={'contraseña'}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.horizontal}>
                <IconMaterialCommunityIcons name='hours-24' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Horario"
                  name={'horario'}
                />
              </View>
              <View style={styles.horizontal}>
                <IconFontAwesome5 name='phone-square-alt' size={37} color={'#49688d'} style={{ paddingRight: 5 }} />
                <FormikInputValue
                  placeholder="Teléfono"
                  name={'telefono'}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.horizontal}>
                <IconMaterialCommunityIcons name='web' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Web"
                  name={'web'}
                />
              </View>
              <View style={styles.horizontal}>
                <IconFontAwesome5 name='facebook' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Facebook"
                  name={'facebook'}
                />
              </View>
              <View style={styles.horizontal}>
                <IconEntypo name='instagram-with-circle' size={37} color={'#49688d'} />
                <FormikInputValue
                  placeholder="Instagram"
                  name={'instagram'}
                />
              </View>
              <TouchableOpacity
                style={isValid&&dirty ? styles.boton : styles.botonDeshabilitado}
                onPress={() => { handleSubmit() }} disabled={!isValid}>
                <Text style={{ fontSize: 15 }}>Registrarme</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { //@ts-ignore
                  
                 }
                }
              >
                <Text  style={styles.link}>¿Tienes ya una cuenta?</Text>

              </TouchableOpacity>
            </View>

          )
        }}
      </Formik>
    </ScrollView>
  )

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
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    verticalAlign: 'middle',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 35,
    borderColor: '#49688d',
    borderWidth: 1,
    marginLeft: 14,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    width: 250,
    textAlign: 'center',
  },
  desc: {
    height: 100,
    borderColor: '#49688d',
    borderWidth: 1,
    marginLeft: 14,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    width: 250,
    textAlign: 'center',
  },
});
export default RegistroComercio
