import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert, TouchableNativeFeedback } from 'react-native';
import { useEffect, useState } from 'react';
import Component from 'react-native-paper/lib/typescript/components/Typography/Text';


export default function ModalImagen(props: any) {
    return (<Modal style={{width: '100%', height: '100%'}}
        animationType='slide'
        visible={true}
    >
        <View style={{ height: 365, width: '85%', alignItems: 'center' }}>
            <View style={{width: '70%', alignItems: 'flex-end'}}>
                <TouchableNativeFeedback onPress={() => { props.close() }} >
                    <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png' }} style={{ width: 40, height: 40 }}></Image>
                </TouchableNativeFeedback>
            </View>
            <Image
                source={{ uri: 'http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/' + "estela" }}
                style={{ width: '70%', height: '70%'}}
            />

        </View>
    </Modal>
    )
}