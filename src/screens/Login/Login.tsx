import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Login } from '../../Servicies/UsuarioService/UsuarioServices';
import IUsuario from '../../Interfaces/IUsuario';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'; // Importa el componente Modal

export default function LoginScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkCredentials, setCheckCredentials] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userLogged, setUserLogged] = useState<IUsuario>();
  const [comercioLogged, setComercioLogged] = useState<IUsuario>();

  const handleLogin = () => {
    Login(userName, password)
      .then((res: any) => {
        if (res != null || res != undefined) {
          console.log(res.$values[0].nickname);
          setUserLogged(res.$values[0]);
          setComercioLogged(res.$values[1]);
          setCheckCredentials(true);
          setShowLoginModal(true);
        }
      })
      .catch((error) => {
        console.log('Credenciales incorrectas');
        setCheckCredentials(false);
        setErrorMessage('Usuario o Contraseña Incorrectos!');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>Imagen logo PROP</Text>
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
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <Button title="Iniciar Sesión" onPress={handleLogin} />
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
          <Text style={styles.modalTitle}>Seleccione la cuenta con la que desea Registrarse</Text>
          <Button
            title="Registrarse como Usuario"
            onPress={() => {
              //@ts-ignore
              navigation.navigate('RegistroUsuario');
              setShowRegisterModal(false);
            }}
            color="#007AFF"
          />
          <Button
            title="Registrarse como Comercio"
            onPress={() => {
              //@ts-ignore
              navigation.navigate('RegistroComercio');
              setShowRegisterModal(false);
            }}
            color="#007AFF"
          />
          <Button title="Cancelar" onPress={() => setShowRegisterModal(false)} />
        </View>
      </Modal>

      <Modal isVisible={showLoginModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccione la cuenta con la que desea Iniciar Sesión</Text>
          {userLogged !== undefined && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                userSingleton.setUser(userLogged ? userLogged : null);
                console.log('User Logged: ' + userSingleton.getUser()?.nickname);
                //@ts-ignore
                navigation.navigate('InicioApp');
                setShowLoginModal(false);
              }}
            >
              <Text style={styles.buttonText}>
                {userLogged ? userLogged.nickname : 'Usuario no autenticado'}
              </Text>
            </TouchableOpacity>
          )}

          {comercioLogged !== undefined && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                userSingleton.setUser(comercioLogged ? comercioLogged : null);
                console.log('Comercio Logged: ' + userSingleton.getUser()?.nickname);
                //@ts-ignore
                navigation.navigate('InicioApp');
                setShowLoginModal(false);
              }}
            >
              <Text style={styles.buttonText}>
                {comercioLogged ? comercioLogged.nickname : 'Comercio no autenticado'}
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
  container: {
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
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
