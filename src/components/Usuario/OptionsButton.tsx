import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function OptionsButton(isOpen: boolean){
    return (
        <View style = {{}}>
        <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={30} color='black' onPress={() => {setIsOpen(!isOpen)}}/>
        </TouchableOpacity>
      </View>
    );
}