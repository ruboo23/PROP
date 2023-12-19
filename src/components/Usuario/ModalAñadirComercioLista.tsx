import {
    StyleSheet,
    Text,
    View,
    TextInput,

    Modal,
    Pressable,
    Alert,
} from "react-native";
import react from "react"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AñadirComercio, PostLista } from "../../Servicies/ListaService/ListaService";
import ModalDropdown from "react-native-modal-dropdown";
import { GetSeguidosByUserId } from "../../Servicies/UsuarioService/UsuarioServices";
import GetAllComercios from "../../Servicies/ComercioService";
import userSingleton from "../../Servicies/GlobalStates/UserSingleton";

interface Lista {
    id: number;
    nombre: string;
    descripcion: string;
    zona: string;
    tiempo: number;
}

interface Comercio {
    id: number,
    nombre: string,
    calle: string
}

interface ModalListaProps {
    close: () => void;
    idUsuario: number;
    setLista: Dispatch<SetStateAction<Lista[]>>;
    Lista: Lista;
    comercios: Array<Comercio>;
    setComercios: (element:[Comercio]) => void;
    setCambios: (element:boolean) => void;
    cambios: boolean;
}

export default function ModalAñadriComerciLista({
    close,
    Lista,
    idUsuario,
    comercios,
    setComercios,
    setCambios,
    cambios
}: ModalListaProps) {
    const [titulo, setTitulo] = useState("");
    const [comercioSeleccionado, setComercioSeleccionado] = react.useState<Comercio>()
    const [comerciosSeguidos, setComerciosSeguidos] = react.useState<Array<Comercio>>([])
    const [nombresComercio, setNombresComercios] = react.useState<Array<string>>([])

    useEffect(() => {
        var listaComercios : Array<Comercio> = []
        var nombreComercio : Array<string> = []
        var comercios = userSingleton.getUser()?.idcomercio.$values
        for(var element in comercios)
        {
            listaComercios.push({id: comercios[element].id, nombre: comercios[element].nombre, calle: comercios[element].calle})
            nombreComercio.push(comercios[element].nombre)
        }
        setComerciosSeguidos(listaComercios);
        setNombresComercios(nombreComercio)
    }, []);


    function handleLista() {
        if (comercioSeleccionado == undefined) {
            Alert.alert(    
                "Información necesaria",
                "Selecciona algun comercio para añadir.",
                [{ text: "Aceptar", style: "cancel" }]
            );
        } else {
            var comercio = comerciosSeguidos.find(comercio => comercio.nombre == nombresComercio[comercioSeleccionado])
            AñadirComercio(Lista.id, comercio.id );
            setComercios([...comercios, comercio])
            setCambios(!cambios)
            close();
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            style={styles.modal}
            onRequestClose={() => { }}
        >
            <View
                style={[
                    styles.centeredView,
                    {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        height: "100%",
                        alignContent: "center",
                    },
                ]}
            >
                <View style={styles.modal}>
                    <Text style={styles.label}>Selecciona una opción:</Text>
                    <ModalDropdown
                        options={nombresComercio}
                        onSelect={(item, index) => {setComercioSeleccionado(item)}}
                        defaultValue="Seleccionar"
                        defaultIndex={0}
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropdownStyle={styles.dropdownContainer}
                        dropdownTextStyle={styles.dropdownItem}
                    />
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                        <Pressable
                            style={[styles.buttonPub, styles.buttonPub]}
                            onPress={() => {
                                handleLista();
                            }}
                        >
                            <Text style={styles.modalText}> Añadir lista </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.buttonClose, styles.buttonClose]}
                            onPress={() => close()}
                        >
                            <Text
                                style={[styles.modalText, { textDecorationLine: "underline" }]}
                            >
                                {" "}
                                Cancelar{" "}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    addImage: {
        backgroundColor: "#E9E8E8",
        borderColor: "grey",
        borderWidth: 0.5,
        width: 160,
        borderRadius: 5,
        marginBottom: 15,
    },
    modalTitle: {
        height: 30,
        marginBottom: 10,
    },
    modalDesc: {
        height: 120,
        marginBottom: 15,
        textAlign: "center",
    }, dropdownContainer: {
        borderRadius: 8,
        width: "68%"
    },
    dropdownItem: {
        fontSize: 16,
        padding: 10,
    },
    dropdown: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20
    },
    dropdownText: {
        fontSize: 16,
    },
    buttonClose: {
        backgroundColor: "transparent",
        borderRadius: 7,
        width: "48%",
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonPub: {
        backgroundColor: "#888DC7",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7,
        width: "48%",
    },
    modal: {
        elevation: 20,
        borderColor: "black",
        borderWidth: 1.5,
        backgroundColor: "white",
        width: "85%",
        alignSelf: "center",
        padding: 20,
        borderRadius: 15,
        height: 200,
    },
    modalText: {
        margin: 12,
        textAlign: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputDesc: {
        height: 120,
        borderColor: "#49688d",
        borderWidth: 1,
        marginLeft: 14,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        width: 250,
        textAlign: "center",
    },
    inputZona: {
        height: 30,
        borderColor: "#49688d",
        borderWidth: 1,
        marginLeft: 14,
        marginBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        width: 120,
        textAlign: "center",
    },
    inputTitulo: {
        height: 30,
        borderColor: "#49688d",
        borderWidth: 1,
        marginLeft: 14,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        width: 250,
        textAlign: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        paddingRight: 10,
        backgroundColor: "orange",
        width: 100,
        borderRadius: 7,
        marginRight: 10,
        marginBottom: 10,
    },
    option: {
        width: 100,
        textAlign: "center",
        fontSize: 17,
        padding: 5,
        color: "black",
    },
});
