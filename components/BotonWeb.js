import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import icon from '../assets/webx32.png';

const BotonWeb = (props) => {
    const {onPress, text}= props
    return(
        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress = {onPress}
        >           
            <Image
                source={icon}               
            />
            <Text
                style={styles.buttonText}
            >{text}
            </Text>
        </TouchableOpacity>
    )
}

export default BotonWeb

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor: '#483d8b',
        marginBottom:10,
        paddingHorizontal:8,
        paddingVertical:8,
        borderRadius:6,
        alignItems:'center',
        textAlign: 'center',       
        width:'48%',
        flexDirection: "column",          
    },
    buttonText: {       
        color: '#00ffff',
        fontWeight:'bold',
        textAlign: 'center',
        fontSize: 14,
    },   
})