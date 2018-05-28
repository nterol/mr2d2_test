import React, { Component } from "react";
import {
  View,
  Text,
  NetInfo,
  AsyncStorage,
  ActivityIndicator,
  addImageFromBase64
} from "react-native";
import {
  Card,
  FormInput,
  FormLabel,
  Button,
  FormValidationMessage
} from "react-native-elements";
import { withNavigation } from "react-navigation";
import axios from "axios";
import { formStyles } from "../styles/";
import makeCancelable from "../helpers/makeCancelable";
import RNFetchBlob from "react-native-fetch-blob";

const { dirs } = RNFetchBlob.fs;

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    warning: "",
    connexion: {},
    already: false,
    loading: false
  };

  componentWillMount() {
    AsyncStorage.getItem("token").then(user => {
      this.setState({ ...this.state, already: user ? true : false });
    });
  }

  componentDidMount() {
    // Test de la fonction NetInfo.

    NetInfo.getConnectionInfo().then(connectionInfo => {
      console.log("GET NET INFO", connectionInfo);
      this.setState({
        ...this.state,
        loading: false,
        connexion: { ...connectionInfo }
      });
    });
    NetInfo.addEventListener("connectionChange", networkType => {
      console.log("NETWORK CHANGES", networkType);
      this.setState({
        ...this.state,
        loading: false,
        connexion: { ...networkType }
      });
    });
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    this.cancelable.cancel();
  }

  // On ne fait que récupérer les valeurs changées onChange et les stocker dans le state
  // Equivalent à ecrire function(event) {return this.setState(...);}
  // Sauf que cette écriture typique d'ES6 ne necessite pas de rebinder la méthode dans un constructeur
  setMail = e => this.setState({ ...this.state, email: e });
  setPass = e => this.setState({ ...this.state, password: e });
  signInSubmit = () => {
    const { password, email } = this.state;
    const lowEmail = email.toLowerCase();
    const lowPassword = password.toLowerCase();

    // NetInfo.getConnectionInfo().then((connectionInfo) => {
    //     console.log(`NETINFO Initial, type: ${connectionInfo.type}, effectiveType: ${connectionInfo.effectiveType}`);
    //   });

    // console.log(`À valider :${lowEmail}, ${lowPassword}`);
    // if (lowPassword === 'demos2016' && lowEmail === 'adm105@recette32.com') {
    // if (this.s)
    const data = {
      user: {
        email: "adm105@recette32.com",
        password: "demos2016"
      }
    };
    const url = "https://api-recette32.mobiler2d2.net/mobileapi/users/sign_in";
    //La partie qui suit serait traitée en Action/ par redux-thunk...
    this.setState({ ...this.state, loading: true });
    this.cancelable = makeCancelable(axios.post(url, data)); //this.cancelable(url, data)
    this.cancelable.promise
      .then(res => {
        const [u] = res.data.user;
        const { authentication_token: auth } = u;

        AsyncStorage.setItem("token", auth);
        return Promise.all([
          RNFetchBlob.config({
            // fileCache: true,
            path: `${dirs.DocumentDir}/avatar.png`
          }).fetch("GET", encodeURI(u.lib_avat_url)),
          AsyncStorage.getItem("avatar")
        ]);
      })
      .then(res => {
        const imagePath = res[0].path();
        res[1]
          ? console.log("Image non sauvegardée")
          : AsyncStorage.setItem("avatar", imagePath);
        this.setState({ ...this.state, loading: false });
        this.props.navigation.navigate("Home");
      })
      .catch(e => console.log("Error : ", e));

    // } else {
    //     this.setState({...this.state, warning: "Vous n'êtes pas encore connecté..."})
    // }
    // })
    // } else {
    //     this.setState({
    //         ...this.state,
    //         email: '',
    //         password: '',
    //         warning: "Ces identifiants ne sont pas reconnus"
    //     })
    // }
  };

  render() {
    let { password, email, warning, connexion, already, loading } = this.state;
    const { styleTitle, containerStyle, buttonStyle } = formStyles;
    warning !== ""
      ? setTimeout(() => {
          this.setState({ ...this.state, warning: "" });
        }, 5000)
      : null;
    return (
      <Card
        title="Connexion"
        titleStyle={styleTitle}
        containerStyle={containerStyle}
      >
        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder="votre mail ici..."
          value={email}
          onChangeText={this.setMail}
          editable={!already}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder="...et votre mot de passe là"
          secureTextEntry
          value={password}
          onChangeText={this.setPass}
          editable={!already}
        />
        <FormValidationMessage>{warning}</FormValidationMessage>
        <Text style={{ color: "blue" }}>
          Type de connexion : {connexion.type}
        </Text>
        <Text style={{ color: "blue" }}>
          Effectivité: {connexion.effectiveType}
        </Text>
        {already && (
          <FormValidationMessage>
            Vous êtes déjà connecté !
          </FormValidationMessage>
        )}
        {loading && <ActivityIndicator />}
        <Button
          onPress={this.signInSubmit}
          buttonStyle={buttonStyle}
          backgroundColor="#03A9F4"
          title="Sign in"
          disabled={already}
        />
      </Card>
    );
  }
}

// withNavigation permet de forcer l'héritage des navigations props.
export default withNavigation(SignIn);
