import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RegistroComercio1 from './RegistroComercio1';
import RegistroComercio2 from './RegistroComercio2';
import RegistroComercio3 from './RegistroComercio3';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  RegistroComercio1: any;
  RegistroComercio2: any;
  RegistroComercio3: any;

};

export default function RegistroComercioPrincipal(){
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    return (
      <View style={{ flex: 1}}>
            <View style={{position:"absolute", width:"60%",borderWidth:1, borderColor:"black", marginTop:84,alignSelf:"center"}}/>
        <Tab.Navigator
          screenOptions={({ route }) => ({       
            tabBarAllowFontScaling: true,
            tabBarStyle: { 
              marginBottom: 10,
              marginTop:50,
              backgroundColor: 'transparent',
              height: "12%",
              shadowColor: 'transparent',
              
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{flex:1, justifyContent:"center", marginVertical:23}}>
                  {route.name == "RegistroComercio1" && 
                    <TouchableOpacity style={[ styles.button, focused ? [{backgroundColor: 'black', }] : {backgroundColor: 'white'}]}>
                      <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>1</Text>
                    </TouchableOpacity>
                  }
                  {route.name == "RegistroComercio2" && 
                  <TouchableOpacity style={[ styles.button, focused ? [{backgroundColor: 'black'}] : {backgroundColor: 'white'}]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>2</Text>
                  </TouchableOpacity>
                  }
                  
                  {route.name == "RegistroComercio3" && 
                  <TouchableOpacity style={[ styles.button, focused ? [{backgroundColor: 'black'}] : {backgroundColor: 'white'}]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>3</Text>
                  </TouchableOpacity>
                  }
  
                </View>
                
              )
            },
            tabBarPressColor: 'transparent',
            tabBarLabelStyle: { color: 'transparent' },
            tabBarContentContainerStyle: { backgroundColor: 'transparent' },  
            tabBarIndicatorStyle: { backgroundColor: 'transparent' },
            headerStyle: { backgroundColor: 'transparent' },
            headerTitleStyle: { fontSize: 8 }
          })}
        >
          <Tab.Screen name='RegistroComercio1' component={RegistroComercio1} />
          <Tab.Screen name='RegistroComercio2' component={RegistroComercio2} />
          <Tab.Screen name='RegistroComercio3' component={RegistroComercio3} />
        </Tab.Navigator>
      </View>
    );
}

const styles = StyleSheet.create({
  button: {
    alignSelf:"center",
    justifyContent: 'space-around', 
    alignItems: 'center',
    width:  50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  },
  buttonText: {
    color: 'black',
  },
  buttonTextPressed: {
    color: 'white',
    fontSize: 17
  },
});
