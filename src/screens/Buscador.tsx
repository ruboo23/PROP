import react from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { Searchbar } from 'react-native-paper';
import TarjetaUsuario from '../components/tarjetaUsuario'
import Usuarios from './Usuarios.json'

//la busqueda la hace el backend
interface Usuario {
    id: Number
    nickname: string;
    imagen: string
}
const usuarios: Array<Usuario> = []


export default function Buscador() {
    react.useEffect( () => {JSONtoUsuario()})
    const [searchInfo, setSearchInfo] = react.useState("")
    const [usuariosEncontrado, setUsuariosEncontrados] = react.useState<Array<Usuario>>([])
    const onSearchChange = (query: string) => {
        setSearchInfo(query)
        const filtered = usuarios.filter((user) =>
            user.nickname.toLowerCase().includes(query.toLowerCase())

        );
        setUsuariosEncontrados(filtered);

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
                data={searchInfo ?  usuariosEncontrado : usuarios}
                renderItem={({ item }) => <TarjetaUsuario nickname={item.nickname} imagen={item.imagen} />}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
    );
}

function JSONtoUsuario() {
    const contenido = Usuarios.$values;
    if(usuarios.length == 0)
    {
        for (const obj in contenido) {
            usuarios.push({ id: contenido[obj].Id, nickname: contenido[obj].NickName, imagen: contenido[obj].ImagenName })
        }   
    }
}