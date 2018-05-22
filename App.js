
// @flow

import React, { Component } from 'react';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
// import {Ionicons} from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
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

const SignInNavigator = createStackNavigator({
  SignIn: SignInScreen,
});
 

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
    },
// About: {
//   screen: AboutView,
// },
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
  Auth: SignInNavigator,
  Home: HomeNavigator,

});

export default class App extends Component {
  render() {
    return <AppNavigator/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  }
});


  // componentDidMount() {
  //   axios.get('http://localhost:3000/getemall')
  //     .then(res => {
  //       console.log(res.data);
  //       return res.data;
  //     })
  //     .then(results => this.setState({results}))
  //     .catch(e => console.log(e));
  // }

  

// class SettingScreen extends Component {
//   render () {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
//         <Text>Settings !</Text>
//         <Button
//           title="Go Back Home"
//           onPress={() => this.props.navigation.navigate('Home')}
//         /> 
//       </View>
//     );
//   }
// }



// class AboutView extends Component {

//   static navigationOptions = ({navigation, navigationOptions}) => {
//     const {params} = navigation.state;
//     return {
//       title : params ? params.otherParams : 'Something Something',
//       headerStyle : {
//         backgroundColor: navigationOptions.headerTintColor,
//       },
//       headerTintColor: navigationOptions.headerStyle.backgroundColor,
//     };
//   };

  
//   render() {
//     const {navigation} = this.props;
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Text>THIS IS ABOUT VIEW BRU</Text>
//         <Button
//           title="About Again"
//           onPress={() => navigation.push('About')}
//         />
//         <Button
//           title="Go home"
//           onPress={() => navigation.navigate('Home')}
//         />
//         <Button
//           title="Go Back"
//           onPress={() => navigation.goBack()}
//         />
//       </View>)
//   }
// }

// const Tabs = createBottomTabNavigator({
//   Home: HomeView,
//   Settings : SettingScreen
// },{
//   navigationOptions: ({ navigation }) => ({
//     tabBarIcon: ({ focused, tintColor }) => {
//       const { routeName } = navigation.state;
//       let iconName;
//       if (routeName === 'Home') {
//         iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//       } else if (routeName === 'Settings') {
//         iconName = `ios-options${focused ? '' : '-outline'}`;
//       }

//       // You can return any component that you like here! We usually use an
//       // icon component from react-native-vector-icons
//       return <Ionicons name={iconName} size={25} color={tintColor} />;
//     },
//   }),
//   tabBarOptions: {
//     activeTintColor: 'tomato',
//     inactiveTintColor: 'gray',
//     swipeEnabled: true,
//     lazy: false
//   },
// }
// )

// const MainStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeView
//     },
//     About: {
//       screen: AboutView,
//     },
//     initialScreen: {
//       screen: 'Home'
//     },
//   },{
//     navigationOptions : {
//       title: 'Home',
//       headerStyle: {
//         backgroundColor: 'darkslategrey',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold'
//       }
//     }
//   }
// )

// const RootStack = createStackNavigator(
//   {
//     Main: {
//       screen: MainStack,
//     },
//     MyModal: {
//       screen: ModalScreen,
//     },
//     Tabs: {
//       screen: Tabs
//     }
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//   }
// );

// export default class App extends Component {

//   // state = {
//   //   results: []
//   // }

//   // componentDidMount() {
//   //   axios.get('http://localhost:3000/getemall')
//   //   .then(res => {
//   //     console.log(res)
//   //     this.setState({results: [...res.data]})
  
//   //   })
//   //   .catch(e => console.log(e))
//   // } 

//   render() {
//     // const {results} = this.state
//     // console.log("Results", results)
//     return <RootStack/>;
//   }
// }
