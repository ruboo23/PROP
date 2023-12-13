import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ComprobarCredenciales, PostUsuario} from './src/Servicies/UsuarioService/UsuarioServices';
import {Formik, useField} from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function App() {  
  const [activo, setActivo] = useState(false);
  const [botonHabilitado, habilitarBoton] = useState(true);
  const [imagen, setImagen] = useState<string[] | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(()=> {
    
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const toggleSwitch = () => {
    setActivo(!activo);
  };

  interface valuesType {
    email: string,
    contraseña: string,
    telefono: Number,
    nombre: string,
    nickname: string,
  }

  function handleRegistro(values : valuesType) {
    ComprobarCredenciales(values.nickname, values.email).then((res) => {
      var aviso = "";
      if (res === 'NC') {
        aviso = "El correo electrónico y el usuario seleccionado ya están en uso, cámbielos."
      } else if (res === 'N') {
        aviso = "El nombre de usuario seleccionado ya están en uso, elija otro."
      } else if (res === 'C') {
        aviso = "El correo electrónico seleccionado ya están en uso, elija otro."
      } else {
        PostUsuario(values, activo, imagen);
        // Salir de esta ventana o redirigir a otra
        Alert.alert('Registro completado', "Bienvenido a Prop", [
          { text: 'Aceptar', style: 'cancel' },
        ]);
        return;
      }
      Alert.alert('Datos inválidos', aviso, [
        { text: 'Aceptar', style: 'cancel' },
      ]);
    });
  }

  const initialValues = {
    email: '',
    contraseña: '',
    telefono: '',
    nombre: '',
    nickname: '',
    direccion: ''
  }

  const FormikInputValue= ({name, ...props}:any) => {
    const [field, meta, helpers] = useField(name)
    return (
      <View>
        <TextInput
          style={[styles.input]}
          value={field.value}
          onChangeText={value => helpers.setValue(value)}
          {...props} /> 
          {meta.error && <Text style={{ paddingLeft: 15,marginTop: -30, marginBottom: 15, color: 'red'}}>{meta.error}</Text>}
      </View>
    )
  }

  const validate = async (values: { email: string; nombre: any; nickname: any; contraseña: any; telefono: string | any[]; }) => {
    const errors: Record<string, string> = {};
  
    if (!values.email) {
      errors.email = 'El correo es necesario';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email)) {
      errors.email = 'El correo no es válido';
    } else {
      // Comprobar que no está en uso

    }

    if (!values.nombre) {
      errors.nombre = 'El nombre es necesario';
    }

    if (!values.nickname) {
      errors.nickname = 'El nombre de usuario es necesario';
    } else {

    }

    if (!values.contraseña) {
      errors.contraseña = 'La contraseña es necesaria';
    } 

    if (values.telefono && values.telefono.length != 9) {
      errors.telefono = 'Ese nº de teléfono no es válido'
    }

    if (Object.keys(errors).length === 0) { habilitarBoton(false) } else habilitarBoton(true)
    return errors;
  };

  function getImage(): void {
    if (imagen !== null) {
      Alert.alert('Imagen de perfil','¿Quieres eliminar esta foto de perfil?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar foto', onPress: () => { setImagen(null) } },
      ])
      return;
    }
    Alert.alert('Selecciona', 'Selecciona una imagen como foto de perfil', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Desde galería', onPress: async () => {
        if (!hasGalleryPermission) {
          Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la cámara.', [
            { text: 'Aceptar', style: 'cancel' },  ]); 
          return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
          base64: true
        });
        if (result && result.assets) {
          setImagen([result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""])
        } else {
          // cancela  
        }    
      } },
      { text: 'Desde la cámara', onPress: () => {
        if (hasCameraPermission) {
          let result = ImagePicker.launchCameraAsync({
            base64: true
          }).then((result) =>{ 
            if (result && result.assets) {
              setImagen([result.assets[0].uri ? result.assets[0].uri : "", result.assets[0].base64 ? result.assets[0].base64 : ""])
            }
          });
        } else {
          Alert.alert('No has dado permisos de acceso', 'Debes ir a ajustes para permitir el acceso a la cámara.', [
            { text: 'Aceptar', style: 'cancel' },  ]); 
        }
      }},
    ]); 
  }

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={{flexDirection:'row', justifyContent:"center", alignItems: "center"}}>
        <TouchableOpacity onPress={getImage}>
          {imagen !== null ? 
          <Image
            source={{uri: imagen?.[0]}}
            style={{ width: 60, height: 60, borderRadius: 50, marginRight: 10,borderColor: 'black', borderWidth: 1.5 }}
          /> 
          :
            <IconFontAwesome name='user-circle-o' size={60} color={'gray'} style={{marginRight: 10}}/>
          }
        </TouchableOpacity>

        <View>
          <Switch
            style={styles.switch}
            value={activo}
            trackColor={{ false: 'gray', true: '#6b53dd' }}
            thumbColor={activo ? 'white' : 'white'}
            onValueChange={toggleSwitch}
          />
          {activo==true ? <Text style={{marginTop: -20}}>Pública</Text> : <Text style={{marginTop: -20}}>Privada</Text> }
        </View>    
        </View>
      </View>  
      <Formik validate={validate} initialValues={initialValues} onSubmit={(v:any) => handleRegistro(v)}>
        {({ handleSubmit }) => {
          return <View style={{paddingHorizontal:15}}>
            <Text style={{marginLeft:10}}> nombre</Text>
            <View style={styles.horizontal}>
              <FormikInputValue
                placeholder="Nombre Completo" 
                name={'nombre'}    
              />
            </View>
            <Text style={{marginLeft:10}}> Usuario</Text>
            <View style={styles.horizontal}>
              <FormikInputValue
                placeholder="Nombre de usuario" 
                name={'nickname'}      
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
            <Text style={{marginLeft:10}}> telefono</Text>
            <View style={styles.horizontal}>
              <FormikInputValue
                placeholder="Teléfono" 
                name={'telefono'} 
              />
            </View>
            {!botonHabilitado  &&<TouchableOpacity 
              style={{alignSelf:"flex-end"}}
              onPress={() => {handleSubmit()}} disabled={botonHabilitado}>
              <Icon name="chevron-right" size={50}></Icon>
            </TouchableOpacity>
            }
            <TouchableOpacity style={{marginTop: -5}} onPress={() => {               
              //@ts-ignore 
              navigation.navigate('Login') }}>
              <Text style={styles.link}>¿Tienes ya una cuenta?</Text>      
            </TouchableOpacity>
          </View>
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
  switch:{
    transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }], 
    paddingTop: 20
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
  boton:{
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
    width: 320,
    textAlign: 'center',
  },
});