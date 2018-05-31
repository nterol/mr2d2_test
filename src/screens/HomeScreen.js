import React, { Component } from "react";
import {
  View,
  Button,
  ActivityIndicator,
  NetInfo,
  AsyncStorage,
  ImageBackground
} from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import Logo from "../components/Logo";
import { homeStyles } from "../styles";

export class HomeScreen extends Component {
  state = {
    logIn: false,
    avatar: ""
  };

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: "Home",
      headerLeft: {
        headerTitle: <Logo />
      },
      headerRight: (
        <Button
          onPress={() => navigation.navigate("Auth")}
          title="HEY"
          color="#000"
        />
      )
    };
  };

  componentWillMount() {
    // AsyncStorage.getItem("token").then(user =>
    //   this.setState({ logIn: user ? true : false })
    // );
    AsyncStorage.multiGet(["token", "avatar"]).then(res => {
      let [[, token], [, avatar]] = res;
      console.log(token, avatar);
      this.setState({
        logIn: token ? true : false,
        avatar
      });
    });
  }

  componentWillUnmount() {
    AsyncStorage.flushGetRequests();
  }

  asyncLogOff = async () => {
    await AsyncStorage.clear();
    // await AsyncStorage.removeItem("token", e => console.log(e));
    this.props.navigation.navigate("Auth");
  };

  // deletePic = async () => {
  //   const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/avatar.png`;
  // };

  render() {
    const { navigation } = this.props;
    const { logIn, avatar } = this.state;
    const { container, formerContainer, triangle, img } = homeStyles;
    return (
      <View style={container}>
        <Button
          title={logIn ? "Déconnexion" : "Connexion"}
          onPress={this.asyncLogOff}
        />
      </View>
    );
  }
}
