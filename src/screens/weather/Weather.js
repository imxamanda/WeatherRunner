import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import Api from '../../services/Api';
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import { Divider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Weather({ navigation, route }) {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const imagemBackground = route.params.imagemBackground;
  const cor = route.params.cor;

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    Api.get(`/forecast.json?q=${latitude},${longitude}&lang=pt&days=3`)
      .then(res => {
        setApiData(res.data);
      });
  }, [latitude, longitude]);

  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  if (!fontsLoaded || !apiData) {
    return null;
  }

  const renderWeatherIcon = (conditionCode) => {
    switch (conditionCode) {
      case 1000: // clear
        return <FontAwesome5 name="sun" size={24} color="white" />;
      case 1003: // partly cloudy
        return <FontAwesome5 name="cloud-sun" size={24} color="white" />;
      case 1006: // cloudy
        return <FontAwesome5 name="cloud" size={24} color="white" />;
      case 1063: // patchy rain
      case 1186: // patchy drizzle
      case 1189: // light freezing rain
        return <MaterialCommunityIcons name="weather-rainy" size={24} color="white" />;
      default:
        return null; // ícone padrão ou nulo se não houver correspondência
    }
  };

  return (
    <ImageBackground source={imagemBackground} style={styles.imageBackground}>
      <View style={styles.container}>
        <View>
          <Text style={styles.cidadeTexto}>
            {apiData?.location?.name}, {apiData?.location?.region}
          </Text>
          <View style={styles.temperaturas}>
            <Text style={styles.temperaturaAtual}>
              {apiData?.current?.feelslike_c}°
            </Text>
            <Divider style={{ width: 1, height: '50%', backgroundColor: 'white' }} />
            <View>
              <Text style={styles.temperaturaDiariaTexto}>
                {apiData?.forecast?.forecastday?.[0]?.day?.maxtemp_c}°
              </Text>
              <Text style={[styles.temperaturaDiariaTexto, { color: cor }]}>
                {apiData?.forecast?.forecastday?.[0]?.day?.mintemp_c}°
              </Text>
            </View>
          </View>
          <Text style={[styles.condicaoAtual, { color: cor }]}>
            {apiData?.current?.condition.text}
          </Text>

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

        {/* Card com previsão dos próximos dias */}
        <ScrollView style={styles.cardProximosDias}>
          {apiData?.forecast?.forecastday?.map((dia, index) => (
            <View key={index} style={styles.informacoesProximoDia}>
              <Text style={styles.dataProximoDia}>{dia.date}</Text>
              <Text style={styles.temperaturaProximoDia}>
                Máx: {dia.day.maxtemp_c}° | Mín: {dia.day.mintemp_c}°
              </Text>
              <View style={styles.condicaoIcone}>
                {renderWeatherIcon(dia.day.condition.code)}
              </View>
              <Text style={styles.condicaoProximoDia}>{dia.day.condition.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Botão para voltar */}
        <View style={styles.butao}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Home') }}
            style={styles.buttonImage}
          >
            <Image
              source={require(`../../../assets/botoes/bvoltar.png`)}
              style={styles.buttonImage}
            />
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
    padding: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  cidadeTexto: {
    fontFamily: 'VT323_400Regular',
    fontSize: 25,
    color: 'white',
    paddingBottom: 10,
  },
  temperaturas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperaturaAtual: {
    fontFamily: 'VT323_400Regular',
    fontSize: 90,
    color: 'white',
    paddingTop: 10,
    textAlign: 'center',
  },
  temperaturaDiariaTexto: {
    fontFamily: 'VT323_400Regular',
    fontSize: 25,
    color: 'white',
    paddingBottom: 10,
  },
  condicaoAtual: {
    fontFamily: 'VT323_400Regular',
    fontSize: 30,
    paddingTop: 10,
    textAlign: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
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
  texto: {
    fontFamily: 'VT323_400Regular',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  textoPequeno: {
    fontFamily: 'VT323_400Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  cardProximosDias: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    marginBottom: 70,
  },
  informacoesProximoDia: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    marginBottom: 10,
  },
  dataProximoDia: {
    fontFamily: 'VT323_400Regular',
    fontSize: 20,
    color: 'white',
  },
  temperaturaProximoDia: {
    fontFamily: 'VT323_400Regular',
    fontSize: 18,
    color: 'white',
  },
  condicaoProximoDia: {
    fontFamily: 'VT323_400Regular',
    fontSize: 16,
    color: 'white',
  },
  condicaoIcone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  butao: {
    position: 'absolute',
    right: 20,
    bottom: -20,
  },
  buttonImage: {
    width: 130,
    height: 160,
  },
});