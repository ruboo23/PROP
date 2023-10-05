import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eaeaea',
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
        width: '90%',
        paddingHorizontal: 10,
    }
});

// onSubmit is a function that receives a string and returns nothing
export default function SearchBar({ onSubmit }: { onSubmit: (text: string) => void }) {
    return (
        <View style={styles.container}>
            <Icon name="search" size={30} color="black" />
            <TextInput
                style={styles.input}
                placeholder="Busca una dirección"
                onSubmitEditing={(event) => onSubmit(event.nativeEvent.text)}
            />
        </View>
    );
}