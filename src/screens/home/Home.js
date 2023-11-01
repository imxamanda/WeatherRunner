import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import Localizacao from '../../components/Localizacao';
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';

const Home = () => {
  const localizacaoData = Localizacao();
  console.log(localizacaoData.apiData);

  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  const [isAboutModalVisible, setAboutModalVisible] = useState(false);

  const toggleAboutModal = () => {
    setAboutModalVisible(!isAboutModalVisible);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider>
      <ImageBackground source={require(`../../../assets/background/noiteNublado.png`)} style={styles.imageBackground}>
        <View style={styles.temperatura}>
          <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 80, color: 'white', paddingBottom: 0 }}>{localizacaoData?.apiData?.location?.name}</Text>
          <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 150, color: 'white', paddingTop: 0 }}>{localizacaoData?.apiData?.current?.feelslike_c}°</Text>

          <Text style={{ fontFamily: 'VT323_400Regular', fontSize: 40, color: '#bcbcbc', marginTop: 28 }}>{localizacaoData?.apiData?.current?.condition.text}</Text>

          <Image
            style={styles.image}
            source={require(`../../../assets/character/clay.png`)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLarge}>
            <Text style={styles.buttonText}>Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLarge}>
            <Text style={styles.buttonText}>Weather</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonSmall} onPress={toggleAboutModal}>
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <Portal>
          <Modal
            visible={isAboutModalVisible}
            onDismiss={toggleAboutModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Text>About Modal Content</Text>
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
    width: '100%',
  },
  temperatura: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    gap: -68,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  buttonLarge: {
    backgroundColor: '#6959CD',
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonSmall: {
    backgroundColor: '#483D8B',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
});
