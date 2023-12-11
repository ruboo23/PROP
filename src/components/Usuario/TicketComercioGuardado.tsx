import React, { useEffect, useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableNativeFeedback } from 'react-native';
import Constants from 'expo-constants'
import { all } from "axios";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from "@expo/vector-icons";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import userSingleton from "../../Servicies/GlobalStates/UserSingleton";

export type RootStackParamList = {
    PerfilComercio: { id: number, esComercioLogueado: boolean };
  };

export default function TicketComercioGuardado (props: any) {
    const [esSeguido, setEsSeguido] = useState<boolean>(false);
    const User = userSingleton.getUser();

  
    const renderStars = () => {
        const images = [];
        for (let i = 0; i < Math.floor(props.Comercio.valoracionpromedio); i++) {
          images.push(
            <Icon
              key={i}
              size={17}
              name={'star'}
              color={'black'}
            />
          );
        }
        if(Math.floor(props.Comercio.valoracionpromedio) != props.Comercio.valoracionpromedio){
          images.push(
            <Icon
              key={props.Comercio.valoracionpromedio + 1}
              size={17}
              name={'staro'}
              color={'black'}
            />
          );
        }
        return images;
      };

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const redirectToPerfilScreen = () => {
        navigation.navigate('PerfilComercio', { id: props.Comercio.id, esComercioLogueado: false})
      };

    useEffect(() => {

    })
    return (
       <View style={{ width: 260 }}>
        <TouchableOpacity onPress={()=> redirectToPerfilScreen()}>
            <View style={styles.globlalContainer}>
                <Image source={{ uri: props.Comercio.nombreimagen 
                    ? "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/" + props.Comercio.nombreimagen 
                    : "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/predeterminado?t=2023-11-10T10%3A53%3A54.074Z" }} 
                    style={styles.profileImg} 
                />
                <View style={styles.contentContainer}>
                    <View style={{flexDirection: "row", justifyContent:"space-between"}}> 
                        <Text style={styles.nombre}>{props.Comercio.nombre}</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        {renderStars()}
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>{props.Comercio.descripcion}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
       </View>
    );
}

const style = StyleSheet.create({
    modalAnuncios:{
        alignSelf: "center", 
        width: "95%", 
        height: "75%", 
        backgroundColor: "white", 
        marginVertical: "25%", 
        padding: 20,
        borderRadius: 30,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 4
    },

  });

  const styles = StyleSheet.create({
    globlalContainer: {
      height: 150,
      paddingHorizontal: 20,
      marginBottom: 20,
      marginTop: 20,
      flexDirection: 'row',
    },
    profileImg: {
      width: "85%",
      resizeMode:"cover",
      borderRadius: 10,
    },
    contentContainer: {
      position: 'absolute',
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: "white",
      padding: 15,
      width: "70%",
      height: "90%",
      flex: 1,
      alignSelf: "flex-end",
      right: 0,
    },
    nombre: {
      fontSize: 17,
      fontWeight: 'bold',
      width: "90%"
    },
    descriptionContainer: {
      width: "90%",
      marginTop: 15
  }, 
    textDistancia: {
      color: 'gray',
    },
    description: {
      flexWrap: 'wrap',
  },
    tipo: {
      fontSize: 13,
      fontWeight: 'bold',
    },
  
  });
