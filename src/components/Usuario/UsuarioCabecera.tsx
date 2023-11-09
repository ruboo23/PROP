import { Text } from "react-native";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import CabeceraComercio from "../Comercio/ComercioCabecera";
import { Usuario } from "../../screens/PerfilUsuario";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import userSingleton from "../../Servicies/GlobalStates/UserSingleton";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { GetSeguidoresByUserId, GetSeguidosByUserId } from "../../Servicies/UsuarioService/UsuarioServices";

interface CabeceraUsuarioProps {
    User: Usuario
}

const CabeceraUsuario = ({User}:CabeceraUsuarioProps) => 
{ 
    const [seguidores, setSeguidores] = useState<number>();
    const [seguidos, setSeguidos] = useState<number>();
    useEffect(() => {
        GetSeguidoresByUserId(User.id).then((res: any) => {
            if(res != null && res != undefined){
                if(res.$values[0].idseguidor != null && res.$values[0].idseguidor != undefined){
                    setSeguidores(res.$values[0].idseguidor.$values ? res.$values[0].idseguidor.$values.length : 0)
                }
              }
        })
        GetSeguidosByUserId(User.id).then((res: any) => {
            if(res != null && res != undefined){
                if(res.$values[0].idseguido != null && res.$values[0].idseguido != undefined){
                    setSeguidos(res.$values[0].idseguido.$values ? res.$values[0].idseguido.$values.length : 0)
                }
              }
        })
    }, [])
    const navigation = useNavigation();
   return (
   <View style={styles.ContainerCabecera}>
        <View>
            <Image source={{uri: `https://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/${User.nickname.trim()}`}} style={styles.Imagen}/>
        </View>
        <View style={{marginHorizontal: 20}}>
            <View style = {styles.container}>
                <Text style={styles.TextNick}>{User.nickname}</Text>
                <TouchableOpacity
                style = {{backgroundColor: 'grey'}}
                    onPress={()=> {
                        userSingleton.setUser(null)
                        console.log('logout')
                        // @ts-ignore
                        navigation.navigate('Login')
                    }}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>

            </View>
           <View style={styles.ContainerSeguidores}>
            <View style={{marginRight: 30, alignItems: "center"}}>
                <Text style={{fontSize: 15}}>Seguidores</Text>
                <Text style={{fontSize: 15}}>{seguidores}</Text>
            </View> 
            <View style={{alignItems:"center"}}>
                <Text style={{fontSize: 15}}>Seguidos</Text>
                <Text style={{fontSize: 15}}>{seguidos}</Text>
            </View>
           </View>
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
        marginBottom: 30,
    },
    TextNick :{
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
        marginRight: 50
    },
    ContainerSeguidores: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 10,
    },   
    container: {
        flexDirection: 'row', // Configura la dirección en fila
        alignItems: 'center', // Alinea verticalmente en el centro si es necesario
      },
});
export default CabeceraUsuario;