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
        paddingVertical: 10,
        marginHorizontal: 7,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 8,
        width: 200,
    },
    textoTarjeta: {
        fontWeight: 'bold',
        paddingLeft: 10,
        fontSize: 20
    },
    fotoTarjeta: {
        width: 75, height: 75, overflow: 'hidden', borderRadius: 400 
    }
})

export default TarjetaUsuario;