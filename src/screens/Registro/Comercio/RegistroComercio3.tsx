import { Formik, useField } from 'formik';
import react, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet,Image, Alert, TouchableOpacity } from 'react-native';
import { PostComercio } from '../../../Servicies/ComercioService';
import Icon from 'react-native-vector-icons/Feather';
import { registroComercioSchema3 } from '../../../../ValidateComercio';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal'; // Importa el componente Modal

type RootStackParamList = {
  RegistroComercio1: any;
  RegistroComercio2: any;
  RegistroComercio3: any;
};
export default function RegistroComercio3(props: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [imagen, setImagen] = useState<string[] | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackParamList, 'RegistroComercio2'>>();
  const comercio = route.params?.comercio;
  const [loading, setLoading] = useState<boolean>();

  const FormikInputValue = ({ name, ...props }: any) => {
    const [field, meta, helpers] = useField(name)
    return (
      <View>
        <TextInput
          style={[styles.input]}
          value={field.value ? field.value.toString() : ""}
          onChangeText={value => helpers.setValue(value)}
          {...props} />
        {meta.error && <Text style={{ paddingLeft: 15, marginTop: 0, marginBottom: 0, color: 'red', fontSize: 12 }}>{meta.error}</Text>}
      </View>
    )
  }

  const initialValues = {
    horario: "",
  }

  useEffect(() => {

    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

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

  async function subirComercio(values: any) {
    setLoading(true);
    PostComercio(values).then((res) => {

      if (res) {
        Alert.alert('Registro completado', "Bienvenido a Prop", [
          {
            text: 'Aceptar', onPress: () => {
              //@ts-ignore
              navigation.navigate('Login');
            }, style: 'cancel'
          },
        ]);
        setLoading(false);
      }
      else {
        Alert.alert('Datos inválidos', "Vuelva a intentarlo más tarde", [
          { text: 'Aceptar', style: 'cancel' },
        ]);
        setLoading(false);
      }
    });
  }

  function nextStep(values: any) {
    let data = {
      ...comercio,
      horario: values.lunes + ";" +
        values.martes + ";" +
        values.miercoles + ";" +
        values.jueves + ";" +
        values.viernes + ";" +
        values.sabado + ";" +
        values.domingo,
    }
    console.log(data.horario)
    subirComercio(data)
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 40 }}>
      <Formik style={{ width: '100%', height: '100%' }} initialValues={initialValues} onSubmit={(values: any) => { nextStep(values) }} validationSchema={registroComercioSchema3}>
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <View>
              <Text style={{ marginLeft: 15, marginBottom: 5 }}> Escribe tu horario </Text>
              <View style={styles.horizontal}>
                <Text style={{ marginLeft: 10 }}>Lunes: </Text>
                <FormikInputValue
                  placeholder="10:00-20:00"
                  name={'lunes'}
                />
              </View>
              <View style={styles.horizontal}>
                <Text style={{ marginLeft: 10 }}>Martes: </Text>
                <FormikInputValue
                  placeholder="10:00-20:00"
                  name={'martes'}
                />
              </View>

              <View style={styles.horizontal}>
                <Text style={{ marginLeft: 10 }}>Miercoles: </Text>
                <FormikInputValue
                  placeholder="10:00-20:00"
                  name={'miercoles'}
                />
              </View>
              <View style={styles.horizontal}>
                <Text style={{ marginLeft: 10 }}>Jueves: </Text>
                <FormikInputValue
                  placeholder="10:00-20:00"
                  name={'jueves'}
                />
              </View>
              <View style={styles.horizontal}>
                <Text style={{ marginLeft: 10 }}>Viernes: </Text>
                <FormikInputValue
                  placeholder="10:00-20:00"
                  name={'viernes'}
                />
              </View>
              <View style={styles.horizontal}>
                <Text style={{ marginLeft: 10 }}>Sabado: </Text>
                <FormikInputValue
                  placeholder="10:00-20:00"
                  name={'sabado'}
                />
              </View>
              <View style={styles.horizontal}>
                <Text style={{ marginLeft: 10 }}>Domingo: </Text>
                <FormikInputValue
                  placeholder="10:00-20:00"
                  name={'domingo'}
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RegistroComercio2');
                  }}
                >
                  <Icon name="chevron-left" size={50}></Icon>
                </TouchableOpacity>
                {isValid && <TouchableOpacity
                  style={styles.boton}
                  onPress={() => { handleSubmit() }} disabled={!isValid}>
                  <Text style={{ fontSize: 15, color: "white" }}>Registrarme</Text>
                </TouchableOpacity>}
              </View>
              <TouchableOpacity
                onPress={() => { //@ts-ignore
                  navigation.navigate("Login");
                }
                }
              >
                <Text style={styles.link}>¿Tienes ya una cuenta?</Text>

              </TouchableOpacity>
            </View>

          )
        }}
      </Formik>
      <Modal
        isVisible={loading}
        animationIn={'bounce'}
      >
        <View style={loading ? styles.visibleContainer : styles.hiddenContainer}>
          <Image
              source={require("../../../../assets/loading.gif")}
              style={{ height: 50, width: 150 }}
            >   
          </Image>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  visibleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    width: 160,
    alignSelf: 'center',
    borderRadius: 10
  },
  hiddenContainer: {
    display: 'none', // Esto oculta la vista
  },
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
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 15,
    height: 40,
    width: 150,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center"
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
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
    paddingRight: 10,
    borderRadius: 10,
    width: 200,
    paddingHorizontal: 10,
    textAlign: 'left',
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