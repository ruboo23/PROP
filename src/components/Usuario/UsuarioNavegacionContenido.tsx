import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IconO from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UsuarioPublicaciones from './UsuarioPublicaciones';
import UsuarioListas from './UsuarioListas';

const Tab = createMaterialTopTabNavigator();


export default function NavegacionContenidoUsuario() {
  return (
      <NavigationContainer 
        independent={true}  
      >
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            
            let iconName: string = "";
            let colour : string = "black"
            switch (route.name) {
              case "Publicaciones": iconName = "rate-review"
                break;
              case "Listas": iconName = "list-alt"
                break;
            }
            if (!focused) {colour = "grey"}
            return <IconO name={iconName} size={25} color={colour} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#eaeaea', height: 66 },
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontSize: 8 },
        })}
      >
        <Tab.Screen name='Publicaciones' component={UsuarioPublicaciones}/>
        <Tab.Screen name='Listas' component={UsuarioListas} />
      </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10
  }
});
