import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        width: 201,
        marginLeft: 12,
        borderColor: 'black', 
        borderWidth: 1,
        overflow: 'hidden',
    },
    containerInfo: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: 4
    },
    direccion: {
        fontSize: 10,
        fontWeight: '400',
        marginTop: 8
    },

});

export default function CardComercioEnLista({comercio}: any) {
    const navigation = useNavigation<any>();
    const description = comercio.descripcion.length > 50 ? comercio.descripcion.slice(0, 50) + '...' : comercio.descripcion;
    const direccion = comercio.direccion.length > 25 ? comercio.direccion.slice(0, 25) + '...' : comercio.direccion;
    const valoracion = comercio.valoracionpromedio.toFixed(2);

    return (
        <Pressable onPress={() => {
            navigation.navigate('PerfilComercio', {id: comercio.id, esComercioLogueado: false})
            }}>
            <View style={styles.card}>
                <Image source={{uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${comercio?.nombreimagen}`}}  height={100} width={200} style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
                <View style={styles.containerInfo}>
                    <Text style={styles.title}>{comercio.nombre}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.direccion}>{direccion}</Text>
                </View>
                <View style={{position: 'absolute', bottom: 0, right: 0, padding: 10, display: 'flex', flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, fontWeight: '400', marginRight: 4}}>{valoracion}</Text>
                    <Icon name="star" size={14} color="#888DC7" />
                </View>
                
            </View>
        </Pressable>
    )
}