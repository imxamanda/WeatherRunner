import { Text } from "react-native-paper"
import Localizacao from "../components/Localizacao";


const Home = () => {
  const localizacaoData = Localizacao();
  console.log(localizacaoData.apiData)
  return (
    <>
      <Text>{localizacaoData.latitude}</Text>
      <Text>{localizacaoData.longitude}</Text>
      <Text>{localizacaoData.apiData?.location?.name}</Text>
    </>
  )
}

export default Home