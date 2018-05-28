import React, { Component } from "react";
import {
  View,
  Button,
  ActivityIndicator,
  NetInfo,
  AsyncStorage,
  Image
} from "react-native";
import Logo from "../components/Logo";

export default class HomeScreen extends Component {
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

  render() {
    const { navigation } = this.props;
    const { logIn, avatar } = this.state;
    console.log("AVATAR: ", avatar);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require(avatar)}
          style={{ width: 200, height: 200, borderRadius: 50 }}
        />
        <Button
          title={logIn ? "Déconnexion" : "Connexion"}
          onPress={this.asyncLogOff}
        />
      </View>
    );
  }
}
