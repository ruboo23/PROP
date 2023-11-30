import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedPublicacionScreen from './FeedPublicaciones';
import FeedComerciosScreen from './FeedComercios';

import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

const width : number = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();

export type RootStackParamList = {
  Perfil: { id: number } | undefined;
};

export default function FeedPrincipalScreen(){
    
  
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
      <View style={{ flex: 1}}>
        <Text style={{marginTop: 20, marginLeft: 30, fontSize: 27, fontWeight: '700', fontStyle: "normal"}}>
          Prop de ti
        </Text>
        
        <Tab.Navigator
          screenOptions={({ route }) => ({       
            tabBarAllowFontScaling: true,
            tabBarStyle: { 
              marginBottom: 10,
              backgroundColor: 'transparent',
              height: 40,
              shadowColor: 'transparent',
              
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{flex:1 ,justifyContent:"center"}}>
                  {route.name == "Posts" && 
                    <TouchableOpacity style={[ styles.button, focused ? [{backgroundColor: 'black', marginLeft:25}] : {marginLeft:25}]}>
                      <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                    </TouchableOpacity>
                  }
                  {route.name == "Para ti" && 
                  <TouchableOpacity style={[ styles.button, focused ? [{backgroundColor: 'black',marginRight:25}] : {marginRight:25}]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                  </TouchableOpacity>
                  }
                
                </View>
              )
            },
            tabBarPressColor: 'transparent',
            tabBarLabelStyle: { color: 'transparent' },
            tabBarContentContainerStyle: { backgroundColor: 'transparent' },
            headerStyle: { backgroundColor: 'transparent' },
            headerTitleStyle: { fontSize: 8 },
          })}
        >
          <Tab.Screen name='Posts' component={FeedPublicacionScreen} />
          <Tab.Screen name='Para ti'>
            {() => (
              // @ts-ignore
              <FeedComerciosScreen id={userSingleton.getUser()?.id} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 1,
    alignSelf:"center",
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: (width/2-10),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 25,
  },
  buttonText: {
    color: 'black',
  },
  buttonTextPressed: {
    color: 'white',
    fontSize: 17
  },
});
