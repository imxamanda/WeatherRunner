import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import { Modal, Portal, Button, Provider, Text } from 'react-native-paper';
import Localizacao from '../../components/Localizacao';
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import Sobrenos from '../../components/Sobrenos';
import diaBackground from '../../../assets/background/dia.png';
import noiteBackground from '../../../assets/background/noite.png';

const Home = () => {
  const localizacaoData = Localizacao();
  const [imagemBackground, setImagemBackground] = useState('dia')
  const [isAboutModalVisible, setAboutModalVisible] = useState(false);
  console.log(localizacaoData)

     //variável para mudar o background conforme a API
  useEffect(() => {
    if (localizacaoData?.apiData?.current?.is_day == 0) {
      setImagemBackground('noite')
    } else {
      setImagemBackground('dia')
    }
    console.log(imagemBackground)
  }, [localizacaoData])

   //fonte
  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

   // Constante modal
  const toggleAboutModal = () => {
    setAboutModalVisible(!isAboutModalVisible);
  };

  if (!fontsLoaded) {
    return null;
  }


      // Navega para a tela 'Weather'
    const handleClimaPress = () => {
      navigation.navigate('Weather');
    };
  

  return (
    <Provider>
      <ImageBackground source={imagemBackground === 'dia' ? diaBackground : noiteBackground} style={styles.imageBackground}>
        <View style={styles.temperatura}>
          {/* Localização */}
          <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 80, color: 'white', paddingBottom: 0 }}>{localizacaoData?.apiData?.location?.name}</Text>
          {/* Temperatura */}
          <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 150, color: 'white', paddingTop: 0 }}>{localizacaoData?.apiData?.current?.feelslike_c}°</Text>

          <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 40, color: '#bcbcbc', marginTop: 28, padding: 20 }}>{localizacaoData?.apiData?.current?.condition.text}</Text>
           
           {/* Personagem */}
          <Image
            style={styles.image}
            source={require(`../../../assets/character/clay.png`)}
          />
        </View>

          {/* Botão Jogo */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLarge}>
            <ImageBackground
              style={styles.buttonBackground}
                source={require(`../../../assets/button.png`)}
            >
              <Text style={styles.buttonText}>Game</Text>
            </ImageBackground>
          </TouchableOpacity>
        

           {/* Botão Clima */}
          <TouchableOpacity style={styles.buttonLarge} onPress={handleClimaPress}>
            <ImageBackground
              style={styles.buttonBackground}
              source={require(`../../../assets/button.png`)}
            >
              <Text style={styles.buttonText}>Clima</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        
            {/* Modal */}
        <TouchableOpacity onPress={toggleAboutModal}>
          <ImageBackground
          source={require(`../../../assets/about.png`)}
          style={styles.imageabout}
          />
        </TouchableOpacity>

        <Portal>
          <Modal
            visible={isAboutModalVisible}
            onDismiss={toggleAboutModal}
            contentContainerStyle={styles.modalContainer}
          >  
          
          {/* Componente que puxa as informações para o botão "about us" */}
            <Sobrenos/>
          </Modal>
        </Portal>
      </ImageBackground>
    </Provider>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  temperatura: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    gap: -68,
  },
  image: {
    margin: 80,
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 7,
    gap: 25,
    marginTop: 20
  },
  buttonLarge: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 200,
    height: 200,
  },
  buttonBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontFamily: 'VT323_400Regular',
    color: 'white',
    fontSize: 28,
    bottom: 30,
    right: 2

  },
  buttonTextAbout: {
    fontFamily: 'VT323_400Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  imageabout:{
    width: 100,
    height:90,
  }
});
