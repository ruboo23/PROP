import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PerfilComercio from './src/screens/PerfilComercio';
import PerfilUsuario from './src/screens/PerfilUsuario';
import FeedPublicacionScreen from './src/screens/Feed/FeedPublicaciones';
import FeedPrincipalScreen from './src/screens/Feed';
import MapScreen from './screens/map';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName: string = "";
            let colour: string = "black"
            switch (route.name) {
              case "Tiendas": iconName = "map"
                break;
              case "Feeds": iconName = "home"
                break;
              case "Buscador": iconName = "search"
                break;
              case "Perfil": iconName = "user"
                break;
              case "PerfilUser": iconName = "user"
                break;
            }
            if (!focused) { colour = "grey" }
            return <Icon name={iconName} size={30} color={colour} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#eaeaea' },
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontSize: 30 },
          headerShown: false,
        })}
      >
        <Tab.Screen name='Feeds' component={View} />
        <Tab.Screen name='Tiendas' component={MapScreen}/>
        <Tab.Screen name='Feeds' component={FeedPrincipalScreen} />
        <Tab.Screen name='Mapa' component={View} />
        <Tab.Screen name='Buscador' component={View} />
        <Tab.Screen name='Perfil' component={PerfilComercio} />
        <Tab.Screen name='PerfilUser' component={PerfilUsuario} />
      </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
