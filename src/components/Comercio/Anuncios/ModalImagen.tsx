import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert, TouchableNativeFeedback } from 'react-native';
import { useEffect, useState } from 'react';
import Component from 'react-native-paper/lib/typescript/components/Typography/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ModalImagen(props: any) {
    return (

        <Modal style={{ width: '100%', height: 365 }}
            animationType='fade'
            transparent={true}
            visible={true}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(128, 128, 128, 0.6)' }}>
                <View style={{ height: '53%', width: '88%', alignItems: 'center', marginVertical: '40%', marginHorizontal: '6.5%', backgroundColor: '#DADADA', borderRadius: 5 }}>
                    <View style={{ width: '95%', alignItems: 'flex-end' }}>
                        <TouchableNativeFeedback onPress={() => { props.close() }} >
                            <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png' }} style={{ width: 40, height: 40 }}></Image>
                        </TouchableNativeFeedback>
                    </View>
                        <Image 
                            source={{ uri: props.imagen }}
                            style={{ borderRadius: 8, borderWidth: 1, width: '95%', height: '85%'}}
                        />
                </View>
            </View>
        </Modal>

    )
}