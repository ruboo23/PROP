import { Text } from "react-native";
import { View, Image, StyleSheet } from "react-native";
import CabeceraComercio from "../Comercio/ComercioCabecera";
import { Usuario } from "../../screens/PerfilUsuario";
interface CabeceraUsuarioProps {
    User: Usuario
}

const CabeceraUsuario = ({User}:CabeceraUsuarioProps) => 
{ 
   return (
   <View style={styles.ContainerCabecera}>
        <View>
            <Image source={{uri: 'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/09/569465-whatsapp-que-tus-contactos-ponen-rana-perfil.jpg?tf=3840x'}} style={styles.Imagen}/>
        </View>
        <View style={{marginHorizontal: 20}}>
           <Text style={styles.TextNick}>{User.nickname}</Text>
           <View style={styles.ContainerSeguidores}>
            <View style={{marginRight: 30, alignItems: "center"}}>
                <Text style={{fontSize: 15}}>Seguidores</Text>
                <Text style={{fontSize: 15}}>{User.NumSeguidores}</Text>
            </View> 
            <View style={{alignItems:"center"}}>
                <Text style={{fontSize: 15}}>Seguidos</Text>
                <Text style={{fontSize: 15}}>{User.NumSeguidos}</Text>
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
    },
    ContainerSeguidores: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 10,
    }
});
export default CabeceraUsuario;