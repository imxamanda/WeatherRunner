import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../services/Api'
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import diaBackground from '../../../assets/background/dia.png';
import noiteBackground from '../../../assets/background/noite.png';
import { Divider } from 'react-native-paper';

export default function Weather({navigation, route}) {
  const latitude = route.params.latitude
  const longitude = route.params.longitude
  const imageBackground = route.params.imageBackground
  console.log(latitude)
  console.log(longitude)

  const [apiData, setApiData] = useState(null); 

  useEffect(() =>{
    Api.get(`/forecast.json?q=${latitude},${longitude}&lang=pt`)
    .then(res =>{ 
      setApiData(res.data)
    })
  }, [latitude, longitude])

  
  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

console.log(apiData)
  return (
    <ImageBackground source={imageBackground === 'dia' ? diaBackground : noiteBackground} style={styles.imageBackground}>
      <View style={styles.container}>
        <View>
              <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 25, color: 'white', paddingBottom: 0, paddingLeft: 20, marginTop: 50 }}>{apiData?.location?.name}, {apiData?.location?.region}</Text>
              <View style={styles.temperaturas}>
                <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 90, color: 'white', paddingTop: 0, textAlign: 'center' }}>{apiData?.current?.feelslike_c}°</Text>
                <Divider style={{ width: 1, height: '50%' }} />
                <View>
                  <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 25, color: 'white', paddingBottom: 0 }}> {apiData?.forecast?.forecastday?.[0]?.day?.maxtemp_c}°</Text>
                  <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 25, color: '#bcbcbc', paddingBottom: 0 }}> {apiData?.forecast?.forecastday?.[0]?.day?.mintemp_c}°</Text>
                </View>
              </View>
              <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 30, color: '#bcbcbc', paddingTop: 0, textAlign: 'center' }}>{apiData?.current?.condition.text}</Text>

              <View style={styles.info}>
                <View style={styles.viewInfo}>
                    <Text style={styles.texto}>
                      {apiData?.current?.wind_kph}km/h
                    </Text>
                </View>

                <View  style={styles.viewInfo}>
                    <Text style={styles.texto}>
                      {apiData?.current?.humidity}%
                    </Text>
                </View>

                <View style={styles.viewInfo}>
                    <Text style={styles.texto}>
                    {apiData?.current?.precip_mm}mm
                    </Text>
                </View>
            </View>
        </View>


        <View style={styles.viewHoras}>
          <ScrollView style={styles.infoPorHoras}>
          {apiData?.forecast?.forecastday?.[0]?.hour.map((hora) => 
          <>
            <Text key={hora.time_epoch}>{hora.time}</Text>
            <Text key={hora.temp_c}>{hora.temp_c}</Text>
          </>
          )}
        </ScrollView>
        </View>

        <View style={styles.butao}>
            <TouchableOpacity 
              onPress={()=>{ navigation.navigate('Home')}}
            style={styles.buttonLarge}>
              <ImageBackground
                style={styles.imagebutao}
                  source={require(`../../../assets/button.png`)}
              >
                <Text style={styles.buttonText}>Voltar</Text>
              </ImageBackground>
            </TouchableOpacity>

          </View>
    </View>
    </ImageBackground>
 
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%'
  },
  imagebutao:{
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  butao:{
    position: 'absolute',
    right: -30,
    bottom: -70,
  },
  buttonText:{
    color: '#fff',
    fontSize: 30,
    fontFamily: 'VT323_400Regular',
    top: -30,
    left: -1
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
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 40
  },
  viewInfo: {
    width: 90,
    height: 90,
    backgroundColor: "#7758D1",
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  infoPorHoras: {
      backgroundColor: "#7758D1",
      width: '80%',
      height: 500,
      marginTop: 30,
      borderRadius: 20,
      flexDirection: 'row'
  },
  viewHoras: {
    justifyContent: "center",
    alignItems: "center"
  }
})