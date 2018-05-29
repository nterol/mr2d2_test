import React, { Component } from "react";
import { ImageBackground, View } from "react-native";
import { profileStyles } from "../styles";

export class ProfileScreen extends Component {
  render() {
    const s = { ...profileStyles };
    return (
      <View style={s.container}>
        <ImageBackground blurRadius={4} style={s.img}>
          <View style={s.triangle} />
        </ImageBackground>
      </View>
    );
  }
}
