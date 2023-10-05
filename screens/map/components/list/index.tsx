import { FlatList, StyleSheet, Text, View } from "react-native";

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

export default function StoresList({markers}: {markers: Array<{ latlng: { latitude: number, longitude: number }, title: string, description: string }>}) {
    const hasElements = markers.length > 0;

    return (
        hasElements ?
        <View style={styles.container}>
        <FlatList
            data={markers}
            renderItem={({ item }) => (
            <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            )}
            keyExtractor={item => item.title}
        />
        </View>
        : <Text style={styles.notFound}>No se encontraron resultados</Text>
    );
}
