import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Formik, useField } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { registroComercioSchema } from './ValidateComercio';
import { PostComercio } from './src/Servicies/ComercioService';

function RegistroComercio() {
  const [imagen, setImagen] = useState<string[] | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);

  useEffect(() => {

    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);


  interface Comercio {
    contraseña: string;
    descripcion: string;
    email: string;
    facebook: string;
    horario: string;
    nombre: string;
    telefono: string;
    instagram: string;
    direccion: string;
    web: string;
  }

  const initialValues : Comercio = {
    email: "",
    nombre: "",
    descripcion: "",
    contraseña: "",
    horario: "",
    telefono: "",
    web: "",
    facebook: "",
    instagram: "",
    direccion: ""
  }
  const validate = (values: Comercio) => {
    const errors: Record<string, string> = {}
    if (!values.nombre) {
     errors.nombre = "El nombre es necesario"
    }
    if (!values.email) {
      errors.email = "El email es necesario"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'El email es incorrecto';
    }else { errors.email = ""}
    
    return errors
  }
  const FormikInputValue = ({ name, ...props } : any) => {
    const [field, meta, helpers] = useField(name)
    return (
      <View>
        <TextInput
          style={[styles.input]}
          value={field.value}
          onChangeText={value => helpers.setValue(value)}
          {...props} />
        {meta.error && <Text style={{ paddingLeft: 15, marginTop: -30, marginBottom: 15, color: 'red' }}>{meta.error}</Text>}
      </View>
    )
  }

  function getImage(): void {
    Alert.alert('Selecciona', 'Selecciona una imagen como foto de perfil', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Desde galería', onPress: async () => {
          if (!hasGalleryPermission) {
            Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la cámara.', [
              { text: 'Aceptar', style: 'cancel' },]);
            return;
          }
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
          });
          if (result && result.assets) {
            setImagen([result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""])
            console.log(result.assets[0].uri);
          } else {
            // cancela  
          }
        }
      },
      {
        text: 'Desde la cámara', onPress: () => {
          if (hasCameraPermission) {
            let result = ImagePicker.launchCameraAsync({
              base64: true
            }).then((result) => {
              if (result && result.assets) {
                setImagen([result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""])
              }
            });
          } else {
            Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la cámara.', [
              { text: 'Aceptar', style: 'cancel' },]);
          }
        }
      },
    ]);
  }

  function subirComercio(values:Comercio) {
    PostComercio(values, imagen)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", backgroundColor: "white", paddingVertical: 40 }}>


      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
        <TouchableOpacity onPress={getImage}>
          {imagen !== null ?
            <Image
              source={{ uri: imagen?.[0] }}
              style={{ width: 80, height: 80, marginBottom: 30, borderRadius: 50, borderColor: '#49688d', borderWidth: 2 }}
            />
            :
            <IconFontAwesome name='user-circle-o' size={60} color={'#49688d'} style={{ marginBottom: 40 }} />
          }

        </TouchableOpacity>
        <Image
          source={require('./assets/proppropprop.png')}
          style={{ width: 200, height: 80, marginLeft: 30}}
        />
      </View>
      <Formik style={{ width: '100%', height: '100%' }} initialValues={initialValues} onSubmit={(values:Comercio) => {subirComercio(values)}} validationSchema={registroComercioSchema}>
        {({ handleSubmit, isValid, dirty }) => {
          console.log("is valid " + isValid)
          console.log("isdirty " + dirty)
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
                <IconFontAwesome5 name='phone-square-alt' size={37} color={'#49688d'} style={{paddingRight: 5}}/>
                <FormikInputValue
                  placeholder="Teléfono"
                  name={'telefono'}
                  
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
              style={isValid && dirty ? styles.boton : styles.botonDeshabilitado}
              onPress={handleSubmit} disabled={!isValid && !dirty}>
              <Text style={{fontSize: 15}}>Registrarme</Text>      
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontSize: 13}}>¿Tienes ya una cuenta?</Text>      
            </TouchableOpacity>
            </View>
            
          )
        }}
      </Formik>
    </ScrollView>
  )

}


const styles = StyleSheet.create({
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
