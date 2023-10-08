import react from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { Searchbar } from 'react-native-paper';
import TarjetaUsuario from '../components/tarjetaUsuario'
import Usuarios from './Usuarios.json'
import axios from 'axios'
//la busqueda la hace el backend
interface Usuario {
    id: Number
    nickname: string;
    imagenname: string
}
const usuarios: Array<Usuario> = []


export default function Buscador() {
    react.useEffect(() => { JSONtoUsuario() })
    const [searchInfo, setSearchInfo] = react.useState("")
    const [usuariosEncontrado, setUsuariosEncontrados] = react.useState<Array<Usuario>>([])
    const onSearchChange = (query: string) => {
        setSearchInfo(query)
        const filtered = usuarios.filter((user) =>
            user.nickname.toLowerCase().includes(query.toLowerCase())

        );
        if (query == "") {setUsuariosEncontrados([]);}
        else {setUsuariosEncontrados(filtered);}

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
                data={searchInfo=="" ? [] : usuariosEncontrado}
                renderItem={({ item }) => <TarjetaUsuario nickname={item.nickname} imagen={item.imagenname} />}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
    );
}

function JSONtoUsuario() {
    axios.get('https://propapi20231008104458.azurewebsites.net/api/Usuario').then((response) => {
        const contenido = response.data.$values;
        if (usuarios.length == 0) {
            for (const obj in contenido) {
                let imagen = "";
                if (contenido[obj].ImagenName != null) {
                    imagen = contenido[obj].ImagenName;
                }
                usuarios.push({ id: contenido[obj].Id, nickname: contenido[obj].NickName, imagenname: imagen })
            }
        }
    });
}