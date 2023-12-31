import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 40,
        width: '85%',
        paddingHorizontal: 10,
    }
});

export default function SearchBar({ onSearchChange }: { onSearchChange: (text: string) => void }) {
    return (
        <View style={styles.container}>
            <Icon name="search" size={30} color="black" />
            <TextInput
                style={styles.input}
                placeholder="Busca una tienda por su nombre"
                onChange={(event) => onSearchChange(event.nativeEvent.text)}
            />
        </View>
    );
}