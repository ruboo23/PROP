import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PerfilUsuario from '../PerfilUsuario';
import FeedPrincipalScreen from '../Feed';
import MapScreen from '../map';
import Buscador from '../Buscador';
import Constants from 'expo-constants';
import { ContextProvider } from '../../components/context';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import NotificationService from '../../Servicies/NotificationsServicie/NotificationService'
import sendPushNotification from '../../Servicies/NotificationsServicie/NotificationService';
import { useEffect } from 'react';
import { subscribeAnuncios, subscribeResenyasUsuario } from '../../Supabase/SubscribeChannel';

const Tab = createBottomTabNavigator();

export default function InicioUsuario() {
  const User = userSingleton.getUser();
  useEffect(() => {
    //sendPushNotification('Notification', 'This is my first Notification!')
    subscribeResenyasUsuario();
    subscribeAnuncios();
  }, [])


  return (
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName: string = '';
              let colour: string = '#888DC7';
              switch (route.name) {
                case 'Feeds':
                  iconName = 'home';
                  break;
                case 'Mapa':
                  iconName = 'map';
                  break;
                case 'Buscador':
                  iconName = 'search';
                  break;
                case 'Perfil':
                  iconName = 'user';
                  break;
              }
              if (!focused) {
                colour = 'black';
              }
              return (
                route.name !== "Perfil" ? (
                  <Icon style={{ marginTop: 5 }} name={iconName} size={27} color={colour} />
                ) : (
                  <View>
                    <Image source={{uri: (User?.nombreimagen != null && User?.nombreimagen != undefined && User?.nombreimagen.trim().length > 0) ? `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Usuarios/${User.nombreimagen}`:'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado'}} style={[styles.Imagen, [{borderColor:colour}]]}/>
                  </View>
                )
              );     
            },
            tabBarLabel: '',
            tabBarStyle: {  backgroundColor: 'white',
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            borderTopColor: 'black',
                            borderTopWidth: 1, },
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
          <Tab.Screen name="Perfil">
            {() => 
            // @ts-ignore
            <PerfilUsuario id={userSingleton.getUser()?.id} 
            />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
  );
}

const styles = StyleSheet.create({
  Imagen : {
    marginTop: 5,
    width: 30, 
    height: 30,
    borderWidth: 2, 
    overflow: 'hidden', 
    borderRadius: 400
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
