import { View, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";

import LOGO from "../../../../assets/images/logo.png";
import PLAY from "../../../../assets/images/play.png";

import { styles } from "./styles";

const Start = ({ handleOnStart }) => {
  return (
    <View style={styles.container}>
      <Image source={LOGO} style={styles.logoStyle} />
      <TouchableWithoutFeedback onPress={handleOnStart}>
        <Image source={PLAY} style={styles.playStyle} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export { Start };
