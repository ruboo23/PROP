import react from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { Searchbar } from 'react-native-paper';
import TarjetaUsuario from '../components/tarjetaUsuario'
import Usuarios from './Usuarios.json'
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
        setSearchInfo(query)
        if (timer != null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            if (typeof cancelToken !== typeof undefined) {
                cancelToken.cancel()
                cancelToken = undefined
            }
            cancelToken = axios.CancelToken.source();
            setUsuariosEncontrados([])
            JSONtoUsuario(query, cancelToken.token).then((response) => {setUsuariosEncontrados(response)});
        }, 1000)
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

function JSONtoUsuario (name: string, cancelToken: any) : Promise<Array<Usuario>> {
    return axios.get('https://propapi20231008104458.azurewebsites.net/api/Usuario/string/' + name, { cancelToken: cancelToken }).then((response: any) => {
        const contenido = response.data;
        console.log(contenido)
        let imagen = "";
        if (contenido.ImagenName != null) {
            imagen = contenido.ImagenName;
        }

        const updatedUsuarios = [
            { id: contenido.Id, nickname: contenido.NickName, imagenname: imagen }
        ];
        return updatedUsuarios ;
    }).catch((error: any) => { console.log("error"); });
}