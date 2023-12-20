import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LoginUser } from '../../Servicies/UsuarioService/UsuarioServices';
import IUsuario from '../../Interfaces/IUsuario';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'; // Importa el componente Modal
import { GetComercioByEmail, LoginComercio } from '../../Servicies/ComercioService';
import comercioSingleton from '../../Servicies/GlobalStates/ComercioSingleton';
import IComercio from '../../Interfaces/IComercio';
import { boolean } from 'yup';
const screenWidth = Dimensions.get('window').width;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('Estelaaa');
  const [password, setPassword] = useState('Estelaaa');
  const [checkCredentials, setCheckCredentials] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userLogged, setUserLogged] = useState<IUsuario>();
  const [comercioLogged, setComercioLogged] = useState<IComercio>();
  const [loading, setLoading] = useState<boolean>();

  const handleLogin = () => {
    setLoading(true)
    LoginUser(userName, password)
    .then((res: any) => {
      if (res != null || res != undefined) {
        if(res.$values.length === 0){
          console.log('Loggeando comercio..')
          LoginComercio(userName, password)
          .then((res: any) => {
            if (res != null || res != undefined) {
              console.log(res.$values[0])
              if(res.$values.length === 0){
                setCheckCredentials(false)
                setLoading(false)
              }
              else{
                setComercioLogged(res.$values[0])
                setCheckCredentials(true);
              }
            }
          })
          .catch((error) => {
            setCheckCredentials(false);
            setLoading(false)
            setErrorMessage('Usuario o Contraseña Incorrectos!');
          });
        }
        else{
          setUserLogged(res.$values[0])
          setCheckCredentials(true);
        }
      }
    })
    .catch((error) => {
      setCheckCredentials(false);
      setErrorMessage('Usuario o Contraseña Incorrectos!');
    });
  };

  
  useEffect(() => {
    if (userLogged !== undefined && userLogged.mail) {
      GetComercioByEmail(userLogged.mail.toString())
        .then((res: any) => {
          setComercioLogged(res);
          setShowLoginModal(true);
        })
        .catch(error => {
          console.error('Error al obtener datos del comercio:', error);
        });
    }
  }, [userLogged]);
  
  useEffect(() => {
    if (userLogged !== undefined || comercioLogged !== undefined) {
      setShowLoginModal(true);
    }
  }, [userLogged, comercioLogged]);
  

  return (
    <View style={styles.container}>
          <View style={styles.logoContainer}>
      <Image
        source={require('../../../assets/portadaProp.png')}
        style={{ width: 300, height: 100, marginBottom: 20 }}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={{ marginBottom: 5, marginLeft: 5 }}> Usuario </Text>
      <TextInput
        placeholder="Nombre de Usuario o E-mail"
        value={userName}
        onChangeText={(text) => setUserName(text)}
        style={styles.input}
      />

      <Text style={{ marginBottom: 5, marginLeft: 5 }}> Contraseña </Text>
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      {checkCredentials === false && (
        <Text style={styles.errorText}>Nombre de Usuario o Contraseña Incorrectos!</Text>
      )}

      <TouchableOpacity onPress={handleLogin} style={styles.buttonTouchable}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.registerContainer}>
      <TouchableOpacity
        onPress={() => {
          setShowRegisterModal(true);
        }}
      >
        <Text style={styles.registerLink}>¿Aun no tienes cuenta? Registrate</Text>
      </TouchableOpacity>
    </View>
  
      <Modal isVisible={showRegisterModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccione cómo quiere registrarse</Text>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('RegistroUsuario');
              setShowRegisterModal(false);
            }}
          >
            <Text style={styles.buttonText}>REGISTRARSE COMO USUARIO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('RegistroComercio');
              setShowRegisterModal(false);
            }}
          >
            <Text style={styles.buttonText}>REGISTRARSE COMO COMERCIO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => setShowRegisterModal(false)}
          >
            <Text style={styles.buttonText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    {userLogged !== undefined ? (
      <Modal isVisible={showLoginModal}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTitle}>Seleccione la cuenta con la que desea iniciar sesión</Text>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => {
                userSingleton.setUser(userLogged ? userLogged : null);
                //@ts-ignore
                navigation.navigate('InicioUsuario');
                setShowLoginModal(false);
              }}
            >
              <Text style={styles.buttonText}>
                {userLogged ? userLogged.nickname : 'Usuario no autenticado'}
              </Text>
            </TouchableOpacity>
          </View>

        {comercioLogged !== undefined && (
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => {
              comercioSingleton.setComercio(comercioLogged ? comercioLogged : null);
              //@ts-ignore
              navigation.navigate('InicioComercio');
              setShowLoginModal(false);
            }}
          >
            <Text style={styles.buttonText}>
              {comercioLogged ? comercioLogged.nombre : 'Comercio no autenticado'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
    ):
      <Modal
        isVisible={loading}
        animationIn={'bounce'}
      >
        <View style={loading ? styles.visibleContainer : styles.hiddenContainer}>
          <Image
              source={require('../../../assets/loading.gif')}
              style={{ height: 50, width: 150 }}
            >   
          </Image>
        </View>
      </Modal>
      
    }
    </View>

  );
  
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    marginTop: 170
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 15,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 7,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  buttonTouchable: { width: '100%', backgroundColor: 'black', borderRadius: 7, marginTop: 15 },
  buttonText: { color: 'white', fontSize: 12, margin: 10, alignSelf: 'center', fontWeight: '600' },
  registerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  registerLink: {
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
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
});
