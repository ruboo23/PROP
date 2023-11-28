import { Image, TouchableOpacity, View } from 'react-native';

interface Imagen2Props {
  imagen1: string,
  imagen2: string,
  setImage: (a:string) => void,
  setImagenSeleccionada: (s:string) => void,
  setVisibilidad: (t:boolean) => void
}

export default function Imagen2Component({ imagen1, imagen2, setImage, setImagenSeleccionada, setVisibilidad }: Imagen2Props) {  
  return (
    <View style={{ flexDirection: 'row'}}>
      <TouchableOpacity key={imagen1} style={{ width: '49%', marginTop: 10, marginBottom: 10, }} 
          onPress={() => {
            setImage(imagen1); 
            setImagenSeleccionada(imagen1);
            setVisibilidad(true)
          }}>
          <Image key={imagen1} source={{ uri: imagen1 }} style={{ flex: 1/1.2, width: '97%', height: 120, borderRadius: 10 }} />
      </TouchableOpacity>
      <TouchableOpacity key={imagen2} style={{ width: '49%', marginTop: 10, marginBottom: 10, }} 
          onPress={() => {
            setImage(imagen2); 
            setImagenSeleccionada(imagen2);
            setVisibilidad(true)
          }}>
          <Image key={imagen2} source={{ uri: imagen2 }} style={{ flex: 1/1.2, width: '97%', height: 120, borderRadius: 10, }} />
      </TouchableOpacity>
    </View>
  );
}
