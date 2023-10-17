import react from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const TarjetaUsuario = ({ nickname, imagen }) => {
    return (
        <View style={style.viewTarjeta}>
            <Image
                source={{ uri: imagen=="" ?   'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/09/569465-whatsapp-que-tus-contactos-ponen-rana-perfil.jpg?tf=3840x' : 'https://propapi-ap58.onrender.com/api/Imagen/' + imagen }}
                style={style.fotoTarjeta}
            />
            <Text style={style.textoTarjeta}>{nickname}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    viewTarjeta: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 30,
        marginTop: 10
    },
    textoTarjeta: {
        fontWeight: 'bold',
        paddingLeft: 30,
        fontSize: 20
    },
    fotoTarjeta: {
        width: 75, height: 75, borderColor: 'black', borderWidth: 1, overflow: 'hidden', borderRadius: 400 
    }
})

export default TarjetaUsuario;