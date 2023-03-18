import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import icon from '../assets/plus.png';

const BotonImg2 = (props) => {
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

export default BotonImg2

const styles = StyleSheet.create({

    buttonContainer:{
        backgroundColor: '#483d8b',
        marginBottom:10,
        paddingHorizontal:8,
        paddingVertical:8,
        borderRadius:6,
        alignItems:'center',
        textAlign: 'center',       
        width:'25%',
        flexDirection: "column",          
    },
    buttonText: {       
        color: '#00ffff',
        fontWeight:'bold',
        textAlign: 'center',
        fontSize: 9,
    },   
})