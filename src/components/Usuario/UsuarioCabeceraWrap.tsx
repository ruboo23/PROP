import { Text } from "react-native";
import { View, Image, StyleSheet } from "react-native";

export const CabeceraUsuarioWrap = (props:any) => 
{ 
   return (
    <View style={styles.ContainerCabecera}>
        <View>
            <Image source={{uri:`https://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/${props.User.nickname.trim()}`}} style={styles.Imagen}/>
        </View>
        <View style={{marginHorizontal: 20}}>
           <Text style={styles.TextNick}>{props.User.nickname}</Text>    
        </View>
    </View>
   )
}


const styles = StyleSheet.create({ 
    Imagen : {
        width: 90, 
        height: 90, 
        borderColor: 'black', 
        borderWidth: 1, 
        overflow: 'hidden', 
        borderRadius: 400
    },
    ContainerCabecera: {
        flexDirection: "row",
        marginHorizontal: 30,
        marginVertical: 30,
    },
    TextNick :{
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
    },
    ContainerSeguidores: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 10,
    }
});
