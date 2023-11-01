import { Text } from "react-native-paper"
import { ImageBackground, StyleSheet, View } from "react-native";
import Localizacao from "../../components/Localizacao";
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';


const Home = () => {

  const localizacaoData = Localizacao();
  console.log(localizacaoData.apiData)

  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={require(`../../../assets/background/noiteNublado.png`)} style={styles.imageBackground} >
      <View style={styles.temperatura}>
        <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 80, color: 'white', paddingBottom: 0  }}>{localizacaoData?.apiData?.location?.name}</Text>
        <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 150, color: 'white', paddingTop: 0}}>{localizacaoData?.apiData?.current?.feelslike_c}°</Text>

        <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 40, color: '#bcbcbc', marginTop: 28}}>{localizacaoData?.apiData?.current?.condition.text}</Text>

      </View>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({

  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  temperatura: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    gap: -68
  }
});