import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Api from '../../services/Api';
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import { Divider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

export default function Weather({ navigation, route }) {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const imagemBackground = route.params.imagemBackground;
  const cor = route.params.cor;

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    Api.get(`/forecast.json?q=${latitude},${longitude}&lang=pt`)
      .then(res => {
        setApiData(res.data);
      });
  }, [latitude, longitude]);

  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  // const isDay = horario === 'dia';

  // const getBackgroundColor = () => {
  //   if (isDay) {
  //     return { backgroundColor: '#74cae3', textColor: '#fff' }; 
  //   } else {
  //     return { backgroundColor: '#81007f', textColor: '#fff' }; 
  //   }
  // };

  console.log(apiData);
  return (
    <ImageBackground source={imagemBackground} style={styles.imageBackground}>
      <View style={styles.container}>
        <View>
          <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 25, color: 'white', paddingBottom: 0, paddingLeft: 20, marginTop: 50 }}>{apiData?.location?.name}, {apiData?.location?.region}</Text>
          <View style={styles.temperaturas}>
            <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 90, color: 'white', paddingTop: 0, textAlign: 'center' }}>{apiData?.current?.feelslike_c}°</Text>
            <Divider style={{ width: 1, height: '50%' }} />
            <View>
              <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 25, color: 'white', paddingBottom: 0 }}> {apiData?.forecast?.forecastday?.[0]?.day?.maxtemp_c}°</Text>
              <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 25, color: cor, paddingBottom: 0 }}> {apiData?.forecast?.forecastday?.[0]?.day?.mintemp_c}°</Text>
            </View>
          </View>
          <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 30, color: 'white', paddingTop: 0, textAlign: 'center' }}>{apiData?.current?.condition.text}</Text>

          <View style={styles.info}>
            <View style={[styles.viewInfo, { backgroundColor: cor }]}>
              <Feather name="wind" size={30} color={"#fff"} />
              <Text style={styles.textoPequeno}>
                {apiData?.current?.wind_kph} km/h
              </Text>
            </View>

            <View style={[styles.viewInfo, { backgroundColor: cor }]}>
              <Feather name="thermometer" size={30} color={"#fff"} />
              <Text style={styles.texto}>
                {apiData?.current?.temp_c}°
              </Text>
            </View>

            <View style={[styles.viewInfo, { backgroundColor: cor }]}>
              <Feather name="droplet" size={30} color={'#fff'} />
              <Text style={styles.texto}>
                {apiData?.current?.humidity}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.viewHoras}>
          <ScrollView style={styles.infoPorHoras}>
            {apiData?.forecast?.forecastday?.[0]?.hour.map((hora) =>
              <View key={hora.time_epoch}>
                <Text>{hora.time}</Text>
                <Text>{hora.temp_c}</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* botao voltar */}
        <View style={styles.butao}>
          <TouchableOpacity 
            onPress={() => { navigation.navigate('Home') }}
>
            <ImageBackground
            style={styles.imagebutao}
              source={require(`../../../assets/botoes/bvoltar.png`)}
            >
            </ImageBackground>
          </TouchableOpacity>
        </View>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  imagebutao: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  butao: {
    position: 'absolute',
    right: -10,
    bottom: -70,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'VT323_400Regular',
    top: -30,
    left: -1,
  },
  temperaturas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontFamily: 'VT323_400Regular',
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
  },
  textoPequeno: {
    fontFamily: 'VT323_400Regular',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 40,
  },
  viewInfo: {
    width: 90,
    height: 90,
    backgroundColor: '#7758D1', 
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  infoPorHoras: {
    backgroundColor: "#7758D1",
    width: '80%',
    height: 500,
    marginTop: 30,
    borderRadius: 20,
    flexDirection: 'row',
  },
  viewHoras: {
    justifyContent: "center",
    alignItems: "center",
  },
});
