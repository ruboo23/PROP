import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IconO from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedPublicacionScreen from './FeedPublicaciones';

const Tab = createMaterialTopTabNavigator();

export default function FeedPrincipalScreen(){
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
                case "Comercios": iconName = "rate-review"
                  break;
                case "Publicaciones": iconName = "new-releases"
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
          <Tab.Screen name='Comercios' component={View}/>
          <Tab.Screen name='Publicaciones' component={View} />
        </Tab.Navigator>
        </NavigationContainer>
    );
}