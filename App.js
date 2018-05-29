import React, { Component } from "react";
import {
  LoadingScreen,
  ProfileScreen,
  SignInScreen,
  HomeScreen
} from "./src/screens";
import {
  Text,
  View,
  ScrollView,
  Button,
  ActivityIndicator
} from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

console.disableYellowBox = true;

// A déplacer dans un répertoire Navigation.
// Il serait intéressant d'ajouter des effets de transitions entre les pages.

const SignInNavigator = createStackNavigator({
  SignIn: SignInScreen
});

// const HomeNavigator = createStackNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Profile: { screen: ProfileScreen },
//     initialScreen: {
//       screen: "Home"
//     },
//     navigationOptions: {
//       screen: ProfileScreen,
//       swipeEnabled: true
//     },
//     transitionConfig: () => ({
//       transitionSpec: {
//         duration: 300,
//         easing: Easing.out(Easing.poly(4)),
//         timing: Animated.timing
//       },
//       screenInterpolator: sceneProps => {
//         const { layout, position, scene } = sceneProps;
//         const { index } = scene;
//         const height = layout.initHeight;
//         const translateY = position.interpolate({
//           inputRange: [index - 1, index, index + 1],
//           outputRange: [height, 0, 0]
//         });

//         const opacity = position.interpolate({
//           inputrange: [index - 1, index - 0.99, index],
//           outputRange: [0, 1, 1]
//         });

//         return { opacity, transform: [{ translateY }] };
//       }
//     })
//   }
//   // {
//   //   navigationOptions : {
//   //     title: 'Home',
//   //     headerStyle: {
//   //       backgroundColor: 'darkslategrey',
//   //     },
//   //     headerTintColor: '#fff',
//   //     headerTitleStyle: {
//   //       fontWeight: 'bold'
//   //     }
//   //   }
//   // }
// );

const HomeNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home${focused ? "" : "-outline"}`;
        } else if (routeName === "Profile") {
          iconName = `ios-options${focused ? "" : "-outline"}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      swipeEnabled: true
    })
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen, //
    Auth: SignInNavigator, // Peut être abstrait en RoutesSwitch
    Home: HomeNavigator //
  },
  {
    initialScreen: LoadingScreen // Peut être abstrait en SwitchConfig
  }
);

export default class App extends Component {
  render() {
    return <AppNavigator />;
  }
}
