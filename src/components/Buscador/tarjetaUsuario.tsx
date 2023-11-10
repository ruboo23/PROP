import react from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

interface propsUsuario {
    nickname: string,
    imagen: string
}

const TarjetaUsuario = ({ nickname, imagen } : propsUsuario) => {
    return (
        <View style={style.viewTarjeta}>
            <Image
                source={{ uri: imagen ? 'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Usuarios/'+imagen : 'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado' }}
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