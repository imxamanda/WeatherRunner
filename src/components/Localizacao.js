import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Api from '../services/Api';

export default function Localizacao() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [apiData, setApiData] = useState(null); 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de acesso negada!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      (async () => {
        try {
          const response = await Api.get(`/current.json?q=${latitude},${longitude}&lang=pt`);
          setApiData(response.data);
        } catch (error) {
          console.log("Erro: ", error);
        }
      })();
    }
  }, [latitude, longitude]);

  return { latitude, longitude, apiData };
}
