import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Api from '../services/Api';


export default function Localizacao() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de acesso negada!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude)
        })();

        (async () => {
               Api.get(`/current.json?q=${latitude},${longitude}&`).then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log("Erro: ", error)
            }) 
        })();
    }, []);


    console.log(latitude)
    console.log(longitude)
   
        return (
            <View>
                <Text style={styles.paragraph}>Latitude: {latitude} </Text>
                <Text style={styles.paragraph}> Longitude: {longitude}</Text>
            </View>

        );
    
}

const styles = StyleSheet.create({


    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
})