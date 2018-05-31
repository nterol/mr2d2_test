import React, { Component } from "react";
import {
  ImageBackground,
  Button,
  Image,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { profileStyles } from "../styles";
import RNFetchBlob from "react-native-fetch-blob";

export class ProfileScreen extends Component {
  state = {
    avatar: "",
    firstName: "",
    lastName: "",
    email: "",
    warning: ""
  };

  componentDidMount() {
    AsyncStorage.multiGet(["avatar", "firstName", "lastName", "email"]).then(
      res => {
        const [[, avatar], [, firstName], [, lastName], [, email]] = res;
        const profil = { avatar, firstName, lastName, email };
        console.log(profil);
        this.setState({ ...profil });
      }
    );
  }

  deleteAvatar = async () => {
    await RNFetchBlob.fs
      .unlink(this.state.avatar)
      .then(res => {
        console.log(res);
        this.setState({
          ...this.state,
          warning: "Picture deleted",
          avatar: ""
        });
      })
      .catch(e => console.log(e));
  };

  uploadImage = async () => {};

  render() {
    const { avatar, firstName, lastName, email } = this.state;
    const s = { ...profileStyles };
    return (
      <View style={s.container}>
        <ImageBackground
          source={avatar ? { uri: avatar } : require("../assets/backup.png")}
          blurRadius={9}
          overlayColor="#00ff00"
          style={s.img}
        >
          <View style={s.overlay} />
          <View style={s.triangle} />
          <View style={s.circle}>
            <TouchableOpacity style={s.highLight} onPress={this.uploadImage}>
              <Image
                source={avatar ? { uri: avatar } : require("../assets/add.png")}
                style={s.avatar}
              />
            </TouchableOpacity>
          </View>
          <Text style={s.textAvatar}>{`${firstName} ${lastName}`}</Text>
        </ImageBackground>
        <View style={s.displayInfo}>
          <Text style={s.firstName}>{firstName}</Text>
          <Text>{lastName}</Text>
          <Text>{email}</Text>
          <Button
            title="Supprimer ma photo de profil"
            onPress={this.deleteAvatar}
            disabled={!avatar}
          />
        </View>
      </View>
    );
  }
}
