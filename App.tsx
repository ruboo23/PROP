import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screens/Login/Login';
import InicioUsuario from './src/screens/InicioUsuario/InicioUsuario';
import InicioComercio from './src/screens/InicioComercio/InicioComercio';
import RegistroComercio from './ResgistroComercio';
import RegistroUsuario from './RegistroUsuario'
import { ContextProvider } from './src/components/context';
import PerfilComercio from './src/screens/PerfilComercio';
import PerfilUsuario from './src/screens/PerfilUsuario';
import PerfilUsuarioExterno from './src/screens/PerfilUsuarioExterno';
import registerNNPushToken from 'native-notify';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  registerNNPushToken(14728, 'Dq9t3wG5tveDAAoXbbJh8b');
  registerNNPushToken(14897, '1hw8IfFQUjr3vDsWNC4lNU');
  registerNNPushToken(14895, 'W3VadISHlovbDiB04l4I4O');
  return (
    <ContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InicioUsuario"
          component={InicioUsuario}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InicioComercio"
          component={InicioComercio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PerfilComercio"
          options={{ headerShown: true, title: '' }}
        >
          {() => 
                // @ts-ignore
                <PerfilComercio/>
              }
        </Stack.Screen>
        <Stack.Screen
          name="PerfilUsuario"
          options={{ headerShown: true, title: '' }}
        >
          {() => 
                // @ts-ignore
                <PerfilUsuarioExterno/>
              }
        </Stack.Screen>
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
    </ContextProvider>
  );
}

export default App;
