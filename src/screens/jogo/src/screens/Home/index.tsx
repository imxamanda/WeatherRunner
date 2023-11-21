import { ImageBackground, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

import BACKGROUND from "../../assets/images/background.png";
import Game from "./Game";


const Home = () => {
  return (
    // IMAGEM DE FUNDO
    <ImageBackground source={BACKGROUND} style={styless.container}>
      <Game />
      <View style={styless.butao}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Home') }}
           >
            <ImageBackground
              style={styless.imagebutao}
              source={require(`../../../../../../assets/button.png`)}
            >
              <Text style={styless.buttonText}>Voltar</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

export { Home };
//Definição de estilos para os elementos da tela
const styless = StyleSheet.create({
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
    right: -30,
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