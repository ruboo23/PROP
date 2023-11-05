import react, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button, Pressable, Modal, Image, TouchableNativeFeedback } from 'react-native'
import { Searchbar } from 'react-native-paper';
import TarjetaUsuario from '../components/Buscador/tarjetaUsuario';
import { JSONtoUsuario } from '../Servicies/UsuarioService/ususarioService';
import axios, { CancelTokenSource } from 'axios'
import Constants from 'expo-constants';
import PerfilUsuarioExterno from './PerfilUsuarioExterno';



let cancelToken: any;
let timer: ReturnType<typeof setTimeout>;
//la busqueda la hace el backend
interface Usuario {
    id: Number
    nickname: string;
    imagenname: string
}


export default function Buscador() {
    const [searchInfo, setSearchInfo] = react.useState("")
    const [usuariosEncontrados, setUsuariosEncontrados] = react.useState<Array<Usuario>>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Usuario>();
    const [isLoading, setIsLoading] = useState(false);
    const closeModal = () => { setModalVisible(false); }

    const onSearchChange = (query: string) => {
        setIsLoading(true); 
        setUsuariosEncontrados([])
        setSearchInfo(query)
        if (!!timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            if (typeof cancelToken !== typeof undefined) {
                cancelToken.cancel()
                cancelToken = undefined
            }
            cancelToken = axios.CancelToken.source();
            if (query != "") {
                JSONtoUsuario(query, cancelToken.token).then((response: any) => { setUsuariosEncontrados(response); console.log(response); setIsLoading(false); });
            }
            if (query === "") {setIsLoading(false);}
        }, 500)
    };

    return (
        <View>
            <Searchbar
                placeholder='Busca un usuario'
                onChangeText={onSearchChange}
                value={searchInfo}
            >
            </Searchbar>
            {isLoading ? 
            <View style={{ marginTop: '25%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: ''}}>
                <Image
                    source={require('../../assets/loading.gif')}
                    style={{ height: 80, width: 80 }}
                />        
            </View>
            :
            <View>
            
            <FlatList
                data={searchInfo == '' ? [] : usuariosEncontrados}
                renderItem={({ item }) => (
                    <Pressable onPress={() => {
                        setSelectedUser(item);
                        setModalVisible(true);
                    }}>
                        <TarjetaUsuario nickname={item.nickname} imagen={item.imagenname} />
                    </Pressable>
                )}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', padding: 20 }}>
                      {usuariosEncontrados.length === 0 && searchInfo !== "" ? 'No se han encontrado usuarios con el nombre especificado' : ''}
                    </Text>
                  )}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={false}
            >
                <View>
                    <View style={{display: 'flex', justifyContent: 'flex-end', marginRight: 50, marginTop: 10, width: '100%'}}>
                        <TouchableNativeFeedback onPress={() => setModalVisible(false)} >
                            <Image source={{uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png'}} style={{width: 40, height: 40}}></Image>
                        </TouchableNativeFeedback>
                    </View>
                    <PerfilUsuarioExterno id={selectedUser?.id} closeModal={closeModal}/>
                </View>
            </Modal>
            </View>
        }           
        </View>
    );
}

