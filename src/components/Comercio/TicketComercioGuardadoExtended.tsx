import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Svg  , Path} from 'react-native-svg';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

const windowWidth = Dimensions.get("window").width;

export type RootStackParamList = {
    PerfilComercio: { id: number, esComercioLogueado: boolean };
};

export default function TicketComercioGuardadoExtended(props: any) {


    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const redirectToPerfilScreen = () => {
        navigation.navigate('PerfilComercio', { id: props.Comercio.id, esComercioLogueado: false })
    };

    useEffect(() => {
        
    }, []);

    return (
        <TouchableOpacity onPress={() => redirectToPerfilScreen()}>
            <View style={styles.globlalContainer}>
                <View style={styles.contentContainer}>
                    <Image
                        source={{
                            uri: props.Comercio.nombreimagen
                                ? "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/" + props.Comercio.nombreimagen
                                : "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/predeterminado?t=2023-11-10T10%3A53%3A54.074Z",
                        }}
                        style={styles.profileImg}
                    />
                    <View style={{ marginLeft: 10, flex: 1, marginTop: 10, marginBottom: 10}}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.nombre} numberOfLines={1}>{props.Comercio.nombre}</Text>

                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text ellipsizeMode="tail" style={styles.description} >{props.Comercio.direccion}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "flex-end", marginRight: 15}}>
                            <Text style = {{marginRight: 5, color: '#888DC7', fontSize: 11}} > {props.Comercio.valoracionpromedio.toFixed(1)}</Text>
                            <Svg
                                width={12}
                                height={14}
                                viewBox="0 0 12 11"
                                fill="#888DC7"
                                stroke="#888DC7"
                            >
                             <Path d="M5.54316 0.8545C5.72981 0.495073 6.24399 0.495072 6.43064 0.854499L7.76879 3.43138C7.84617 3.58039 7.99318 3.68061 8.16016 3.6982L11.2229 4.02075C11.6642 4.06722 11.8308 4.62272 11.4879 4.90436L9.30833 6.69469C9.16253 6.81445 9.09657 7.00608 9.13775 7.19021L9.72829 9.83006C9.82016 10.2407 9.39456 10.5743 9.01775 10.3869L6.2095 8.99068C6.06929 8.92096 5.90451 8.92096 5.7643 8.99068L2.95605 10.3869C2.57924 10.5743 2.15364 10.2407 2.24551 9.83006L2.83605 7.19021C2.87724 7.00608 2.81127 6.81445 2.66547 6.69469L0.485908 4.90436C0.143031 4.62272 0.309627 4.06722 0.750907 4.02075L3.81364 3.6982C3.98062 3.68061 4.12763 3.58039 4.20501 3.43138L5.54316 0.8545Z"/>
                            </Svg>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    globlalContainer: {
        height: 230,
        width: (windowWidth/2),
        paddingHorizontal: 10,
    },
    profileImg: {
        width: "100%", // Ajusta el ancho de la imagen según tus preferencias
        height: "50%", // Ajusta la altura de la imagen según tus preferencias
        borderRadius: 10,
    },
    contentContainer: {
        flexDirection: 'column', // Cambié a dirección de columna
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "white",
        padding: 0,
        height: 300,
        flex: 1, 
        marginBottom: 10
    },
    nombre: {
        fontSize: 14,
        fontWeight: 'bold',
        width: "80%"
    },
    descriptionContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 7
    },
    description: {
        flexWrap: 'wrap',
        fontSize: 12
    },
});