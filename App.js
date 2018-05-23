import React, { Component } from 'react';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen';
// import {Ionicons} from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  ScrollView,
  Button,
  ActivityIndicator
} from 'react-native';
import {
  createStackNavigator, 
  createSwitchNavigator 
} from 'react-navigation';

console.disableYellowBox = true;


// A déplacer dans un répertoire Navigation.
// Il serait intéressant d'ajouter des effets de transitions entre les pages.

const SignInNavigator = createStackNavigator({
  SignIn: SignInScreen,
});

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
    },
  initialScreen: {
  screen: 'Home'
  },
},
// {
//   navigationOptions : {
//     title: 'Home',
//     headerStyle: {
//       backgroundColor: 'darkslategrey',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }
// }
);

const AppNavigator = createSwitchNavigator({
  Loading: LoadingScreen,   //
  Auth: SignInNavigator,    // Peut être abstrait en RoutesSwitch
  Home: HomeNavigator,      //
}, {
  initialScreen: LoadingScreen // Peut être abstrait en SwitchConfig
});

export default class App extends Component {
  render() {
    return <AppNavigator/>
  }
}
