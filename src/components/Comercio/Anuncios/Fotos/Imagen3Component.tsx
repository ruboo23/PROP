import { useState } from 'react';
import { Image, Modal, TouchableOpacity, View, Text } from 'react-native';
import ModalImagen from '../ModalImagen';
import { SvgClose } from '../../ComerciosSvg';

interface Imagen2Props {
  imagen1: string,
  imagen2: string,
  imagen3: string,
}

export default function Imagen3Component({ imagen1, imagen2, imagen3 }: Imagen2Props) {  
  const [visible, setVisible] = useState<boolean>(false);
  const [image, setImage] = useState('');

  return (
    <>
    <View style={{ flexDirection: 'row'}}>
      <TouchableOpacity key={'key1'+imagen1} style={{ width: '49%', marginTop: 5, }} 
          onPress={() => { 
            setVisible(true);
            setImage(imagen1);
          }}>
          <Image key={'img1'+imagen1} source={{ uri: imagen1 }} style={{ flex: 1/1.2, width: '97%', height: 120, borderRadius: 10 }} />
      </TouchableOpacity>
      <TouchableOpacity key={'key2'+imagen2} style={{ width: '49%', marginTop: 5, }} 
          onPress={() => {
            setVisible(true);
            setImage(imagen2);
          }}>
          <Image key={'img2'+imagen2} source={{ uri: imagen2 }} style={{ flex: 1/1.2, width: '97%', height: 120, borderRadius: 10, }} />
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity key={'key3'+imagen3} style={{ width: '99%', marginTop: 5, }} 
          onPress={() => {
            setVisible(true);
            setImage(imagen3);
          }}>
          <Image key={'img3'+imagen3} source={{ uri: imagen3 }} style={{ flex: 1/1.2, width: '97%', height: 120, borderRadius: 10, }} />
      </TouchableOpacity>
    </View>
    <Modal visible={visible} style={{ width: '100%', height: 350 }}
            animationType='fade'
            transparent={true}>
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%' }}>
        <View style={{backgroundColor: 'white', width: '90%', height: 420, alignSelf: 'center', borderColor: 'black', borderWidth: 1.5, borderRadius: 8, marginVertical: '45%', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setVisible(false)} style={{ padding: 5, width: '100%', alignItems: 'flex-end', paddingRight: 5}}>
            <SvgClose width={25} height={25}></SvgClose>
          </TouchableOpacity>
          <Image key={'img2'+imagen2} source={{ uri: image }} style={{ flex: 1/1.05, width: '95%', borderRadius: 10, }} />
        </View>
      </View>
      </Modal>
    </>
  );
}
