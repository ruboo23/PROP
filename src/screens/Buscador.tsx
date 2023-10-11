import react from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { Searchbar } from 'react-native-paper';
import TarjetaUsuario from '../components/Buscador/tarjetaUsuario';
import { JSONtoUsuario } from '../Servicies/UsuarioService/ususarioService';
import axios, { CancelTokenSource } from 'axios'


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
    const onSearchChange = (query: string) => {
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
            if(query != ""){
            JSONtoUsuario(query, cancelToken.token).then((response) => { setUsuariosEncontrados(response) });
            }
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
            <FlatList
                data={searchInfo == '' ? [] : usuariosEncontrados}
                renderItem={({ item }) => <TarjetaUsuario nickname={item.nickname} imagen={item.imagenname} />}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
    );
}