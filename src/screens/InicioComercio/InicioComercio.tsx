import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PerfilComercio from '../PerfilComercio';
import Constants from 'expo-constants';
import { ContextProvider } from '../../components/context';
import comercioSingleton from '../../Servicies/GlobalStates/ComercioSingleton';

const Tab = createBottomTabNavigator();

export default function InicioComercio() {
  return (
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName: string = '';
              let colour: string = 'black';
              switch (route.name) {
                case 'Perfil':
                  iconName = 'user';
                  break;
                case 'Estadisticas':
                  iconName = 'line-chart';
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
          <Tab.Screen name="Perfil">
            {() =>
            <PerfilComercio idComercio={comercioSingleton.getComercio()?.id} esComercioLogueado={true}></PerfilComercio>
            }
          </Tab.Screen>
          <Tab.Screen name="Estadisticas">
            {() => 
            <Text>
            Render metrics component here
            </Text>
            }
          </Tab.Screen>

        </Tab.Navigator>
      </View>
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
