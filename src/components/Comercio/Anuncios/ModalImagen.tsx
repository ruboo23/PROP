import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert, TouchableNativeFeedback } from 'react-native';
import { useEffect, useState } from 'react';
import Component from 'react-native-paper/lib/typescript/components/Typography/Text';


export default function ModalImagen(props: any) {
    return (

        <Modal style={{ width: '100%', height: 365 }}
            animationType='fade'
            transparent={true}

            visible={true}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(128, 128, 128, 0.2)' }}>
                <View style={{ height: '60%', width: '80%', alignItems: 'center', marginVertical: '40%', marginHorizontal: '10%' }}>
                    <View style={{ width: '80%', alignItems: 'flex-end' }}>
                        <TouchableNativeFeedback onPress={() => { props.close() }} >
                            <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png' }} style={{ width: 40, height: 40 }}></Image>
                        </TouchableNativeFeedback>
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