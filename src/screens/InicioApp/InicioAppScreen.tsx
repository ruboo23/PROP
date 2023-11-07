import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PerfilComercio from '../PerfilComercio';
import PerfilUsuario from '../PerfilUsuario';
import FeedPublicacionScreen from '../Feed/FeedPublicaciones';
import FeedPrincipalScreen from '../Feed';
import ComerciosCercanos from '../ComerciosCercanos';
import MapScreen from '../map';
import Buscador from '../Buscador';
import Constants from 'expo-constants';
import { ContextProvider } from '../../components/context';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import LoginScreen from '../Login/Login';
import comercioSingleton from '../../Servicies/GlobalStates/ComercioSingleton';

const Tab = createBottomTabNavigator();

export default function InicioAppScreen() {
  return (
    <ContextProvider>
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName: string = '';
              let colour: string = 'black';
              switch (route.name) {
                case 'Mapa':
                  iconName = 'map';
                  break;
                case 'Feeds':
                  iconName = 'home';
                  break;
                case 'Buscador':
                  iconName = 'search';
                  break;
                case 'Perfil':
                  iconName = 'user';
                  break;
                case 'PerfilUser':
                  iconName = 'user';
                  break;
                case 'ComerciosCercanos':
                  iconName = 'search';
                  break;
              }
              if (!focused) {
                colour = 'grey';
              }
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
          <Tab.Screen name="Feeds">
            {() => 
              // @ts-ignore
              <FeedPrincipalScreen id={userSingleton.getUser()?.id} 
              />}
          </Tab.Screen>
          <Tab.Screen name="Mapa" component={MapScreen} />
          <Tab.Screen name="Buscador" component={Buscador} />
          <Tab.Screen name="Perfil" component={PerfilComercio} />
          <Tab.Screen name="PerfilUser">
            {() => 
            // @ts-ignore
            <PerfilUsuario id={userSingleton.getUser()?.id} 
            />}
          </Tab.Screen>
          {/* <Tab.Screen name="ComerciosCercanos" component={ComerciosCercanos} /> */}

        </Tab.Navigator>
      </View>
    </ContextProvider>
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
