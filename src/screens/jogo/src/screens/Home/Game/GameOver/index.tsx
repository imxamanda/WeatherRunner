import { View, Image } from "react-native";
import React, { useEffect } from "react";

import GAME_OVER from "../../../../assets/images/game-over.png";

import { styles } from "./styles";
// Usa o setTimeout para chamar a função handleBackToStart após um tempo.
const GameOver = ({ handleBackToStart }) => {
  useEffect(() => {
    setTimeout(() => {
      handleBackToStart();
    }, 3000);
  }, []);

  return (
    // imagem GAME_OVER.
    <View style={styles.container}>
      <Image source={GAME_OVER} style={styles.logoStyle} />
    </View>
  );
};

export { GameOver };
