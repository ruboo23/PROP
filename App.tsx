import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
            let colour : string = "black"
            switch (route.name) {
              case "Mapa": iconName = "map"
                break;
              case "Feeds": iconName = "home"
                break;
              case "Buscador": iconName = "search"
                break;
              case "Perfil": iconName = "user"
            }
            if (!focused) {colour = "grey"}
            return <Icon name={iconName} size={30} color={colour} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#eaeaea' },
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontSize: 30 }
        })}
      >
        <Tab.Screen name='Feeds' component={View} />
        <Tab.Screen name='Mapa' component={MapScreen}/>
        <Tab.Screen name='Buscador' component={View} />
        <Tab.Screen name='Perfil' component={View} />
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
