import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';



export default function ButtonNew({size, color}){

    return(
        <View style={styles.container}>
            <Entypo name="home" color={color} size={size}/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'black',
        alignItems:'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 30,
        marginLeft: 7
    }
})