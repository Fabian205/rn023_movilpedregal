import React from 'react';
import {StyleSheet, Text, TouchableOpacity } from 'react-native';

const Boton = (props) => {
    const {onPress, text}= props
    return(
        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress = {onPress}
        >
            <Text
                style={styles.buttonText}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default Boton

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor: '#4b0082',
        marginBottom:10,
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:6,
        alignSelf:'center',
        textAlign: 'center',       
        width:'80%'          
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
    },
})