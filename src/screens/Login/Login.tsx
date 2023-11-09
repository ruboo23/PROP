import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Login } from '../../Servicies/UsuarioService/UsuarioServices';
import IUsuario from '../../Interfaces/IUsuario';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'; // Importa el componente Modal
import { GetComercioByEmail } from '../../Servicies/ComercioService';
import comercioSingleton from '../../Servicies/GlobalStates/ComercioSingleton';
import IComercio from '../../Interfaces/IComercio';
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

  const handleLogin = () => {
    Login(userName, password)
      .then((res: any) => {
        if (res != null || res != undefined) {
          if(res.$values.length === 0){
            setCheckCredentials(false)
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
          console.log('Comercio asociado: ' + res?.nombre);
          setShowLoginModal(true);
        })
        .catch(error => {
          console.error('Error al obtener datos del comercio:', error);
        });
    }
    console.log('Comercio Logged: ' + (comercioLogged ? comercioLogged.nombre : 'Comercio no autenticado'));
  }, [userLogged]);
  
  useEffect(() => {
    if (userLogged !== undefined && comercioLogged !== undefined) {
      setShowLoginModal(true);
    }
  }, [userLogged, comercioLogged]);
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/proppropprop.png')}
          style={{ width: 240, height: 100, marginBottom: 20 }}
        />   
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre de Usuario o E-mail"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
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
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>
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
          <Text style={styles.modalTitle}>Seleccione como quiere registrarse</Text>
          <TouchableOpacity style={styles.buttonTouchable} onPress={() => {
              //@ts-ignore
              navigation.navigate('RegistroUsuario');
              setShowRegisterModal(false);
            }}>
            <Text style={styles.buttonText}>REGISTRARSE COMO USUARIO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTouchable} onPress={() => {
              //@ts-ignore
              navigation.navigate('RegistroComercio');
              setShowRegisterModal(false);
            }}>
            <Text style={styles.buttonText}>REGISTRARSE COMO COMERCIO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTouchable} onPress={() => setShowRegisterModal(false)}>
            <Text style={styles.buttonText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={showLoginModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccione la cuenta con la que desea iniciar sesión</Text>
          {userLogged !== undefined && (
            <TouchableOpacity style={styles.buttonTouchable}  
              onPress={() => {
              userSingleton.setUser(userLogged ? userLogged : null);
              console.log('User Logged: ' + userSingleton.getUser()?.nombre);
              //@ts-ignore
              navigation.navigate('InicioUsuario');
              setShowLoginModal(false);
            }}>
              <Text style={styles.buttonText}>
                {userLogged ? userLogged.nickname : 'Usuario no autenticado'}
              </Text>
            </TouchableOpacity>
          )}

          {comercioLogged !== undefined && (
            <TouchableOpacity style={styles.buttonTouchable}  
              onPress={() => {
              comercioSingleton.setComercio(comercioLogged ? comercioLogged : null);
              console.log('Comercio Logged: ' + comercioSingleton.getComercio()?.nombre);
                //@ts-ignore
                navigation.navigate('InicioComercio');
                setShowLoginModal(false);
              }}>
                <Text style={styles.buttonText}>
                  {comercioLogged ? comercioLogged.nombre : 'Comercio no autenticado'}
              </Text>
            </TouchableOpacity>
          )
          }
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonTouchable: { width: '100%', backgroundColor: '#6b53dd', borderRadius: 7, marginTop: 15  },
  buttonText: { color: 'white', fontSize: 14, margin: 10, alignSelf: 'center', fontWeight: '600' },
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 15,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  registerLink: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
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
});
