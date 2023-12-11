import react from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

interface propsUsuario {
    nickname: string,
    imagen: string
}

const TarjetaUsuarioBuscado = ({ nickname, imagen } : propsUsuario) => {
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
        marginHorizontal: '5%',
        marginTop: 10,
        borderBottomWidth: 1,
        width: "90%",
        borderColor: '#B8B8B8'
    },
    textoTarjeta: {
        fontWeight: '500',
        paddingLeft: 30,
        fontSize: 17
    },
    fotoTarjeta: {
        width: 60, height: 60, overflow: 'hidden', borderRadius: 400 
    }
})

export default TarjetaUsuarioBuscado;