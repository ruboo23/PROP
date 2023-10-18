import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Marker, RootStackParamList } from "../..";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";

const styles = StyleSheet.create({
    container: {
            flex: 1,
            marginTop: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    description: {
        fontSize: 16,
    },
    notFound: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    }
});

export default function StoresList({markers}: {markers: Array<Marker>}) {
    const hasElements = markers.length > 0;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        hasElements ?
        <View style={styles.container}>
        <FlatList
            data={markers}
            renderItem={({ item }) => (
            <Pressable onPress={() => {navigation.navigate('Perfil', { id: item.id })}}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.nombre}</Text>
                    <Text style={styles.description}>{item.descripcion}</Text>
                </View>
            </Pressable>
            )}
            keyExtractor={item => item.nombre}
        />
        </View>
        : <Text style={styles.notFound}>No se encontraron resultados</Text>
    );
}
