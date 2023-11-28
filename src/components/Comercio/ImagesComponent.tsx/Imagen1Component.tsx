import { Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

interface Imagen1Props {
  imagen: string,
  setImage: (a:string) => void,
  setImagenSeleccionada: (s:string) => void,
  setVisibilidad: (t:boolean) => void
}

export default function Imagen1Component({ imagen, setImage, setImagenSeleccionada, setVisibilidad }: Imagen1Props) {  
  return (
      <TouchableOpacity key={imagen} style={{ width: '100%', marginTop: 10, marginBottom: 10, }} 
          onPress={() => {
            setImage(imagen); 
            setImagenSeleccionada(imagen);
            setVisibilidad(true)
          }}>
          <Image key={imagen} source={{ uri: imagen }} style={{ flex: 1/1.2, width: '97%', height: 120, borderRadius: 10 }} />
      </TouchableOpacity>
  );
}
