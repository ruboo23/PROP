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
            <TouchableOpacity onPress={props.close} style={{ position: 'absolute', top: 30, left: 10, zIndex: 1000 }}>
                <Icon name='close' size={30} />
            </TouchableOpacity>
            <View style={{ flex: 1, backgroundColor: 'rgba(128, 128, 128, 0.2)' }}>
                <View style={{ height: '60%', width: '80%', alignItems: 'center', marginVertical: '40%', marginHorizontal: '10%' }}>
                    <View style={{ width: '80%', alignItems: 'flex-end' }}>
                    </View>
                        <Image 
                            source={{ uri: props.imagen }}
                            style={{ borderRadius: 20, width: '80%', height: '70%'}}
                        />
                </View>
            </View>
        </Modal>

    )
}