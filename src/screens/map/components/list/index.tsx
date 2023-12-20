import { FlatList, StyleSheet, Text, View } from "react-native";
import { Marker } from "../..";
import { ScrollView } from "react-native-gesture-handler";
import CardComercioEnLista from "../cardComercio";

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
        width: 200,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12
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

export default function StoresList({ markers, types, isSearching }: { markers: Array<Marker>, types: Array<string>, isSearching: boolean }) {
    const hasElements = markers.length > 0;
    const markersByType = types?.reduce((acc, type) => {
        acc[type] = markers.filter(marker => marker?.tipo_id?.$values[0]?.nombre === type);
        return acc;
    }
        , {} as { [key: string]: Array<Marker> });
    console.log('types: ', types)
    console.log('markersByType: ', markersByType)

    const filteredMarkersByType = Object.keys(markersByType).reduce((acc, type) => {
        if (markersByType[type].length > 0) {
            acc[type] = markersByType[type];
        }
        return acc;
    }
        , {} as { [key: string]: Array<Marker> });
    const filteredTypes = Object.keys(filteredMarkersByType);
    const renderListPerType = () => {
        return isSearching ?
            (<View>
                <FlatList
                    horizontal
                    data={markers}
                    renderItem={({ item }) => (<CardComercioEnLista comercio={item} />)}
                    keyExtractor={item => item.nombre}
                    style={{ marginBottom: 24, marginTop: 12 }}
                />
            </View>
            ) :
            filteredTypes?.map((type, index) => {
                return (<View key={'view1' + index}>
                    <Text key={'text1' + index} style={styles.title}>
                        {type}s cerca de ti:
                    </Text>
                    <FlatList
                        key={'flatList1' + index}
                        horizontal
                        data={filteredMarkersByType[type]}
                        renderItem={({ item }) => (<CardComercioEnLista comercio={item} />)}
                        keyExtractor={item => item.nombre}
                        style={{ marginBottom: 24, marginTop: 12 }}
                    />
                </View>
                )
            }
            )
    }
    return (
        hasElements ?
            <View style={styles.container}>
                <ScrollView>
                    {renderListPerType()}
                </ScrollView>
            </View>
            : <Text style={styles.notFound}>No se encontraron resultados</Text>
    );
}
