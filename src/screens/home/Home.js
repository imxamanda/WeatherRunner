import { Text } from "react-native-paper"
import { ImageBackground, StyleSheet } from "react-native";
import Localizacao from "../../components/Localizacao";


const Home = () => {
  const localizacaoData = Localizacao();
  console.log(localizacaoData.apiData.current.condition.text)
  return (
    
   
      <ImageBackground source={require(`../../../assets/background/dia.png`)} style={styles.imageBackground} />
    

   
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
  }
});