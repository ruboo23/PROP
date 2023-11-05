import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screens/Login/Login';
import InicioAppScreen from './src/screens/InicioApp/InicioAppScreen';
import RegistroComercio from './ResgistroComercio';
import RegistroUsuario from './RegistroUsuario'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InicioApp"
          component={InicioAppScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistroComercio"
          component={RegistroComercio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistroUsuario"
          component={RegistroUsuario}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
