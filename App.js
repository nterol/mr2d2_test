
// @flow

import React, { Component } from 'react';
import UserList from './Components/UserList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  ActivityIndicator
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator } from 'react-navigation';

console.disableYellowBox = true;

class Logo extends Component {
  render () {
    return (
      <Image
        source={require('./res/beacon.png')}
        style={{width: 50, height: 50}}
      />
    );
  }
}

class HomeView extends Component {

  state = {
    results: []
  }
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: <Logo />,
      headerRight: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="HEY"
          color= "#fff"
        />
      )
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/getemall')
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(results => this.setState({results}))
      .catch(e => console.log(e));
  }

  render() {
    const {navigation} = this.props;
    let {results} = this.state;
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
          {
            results.length === 0 ? <ActivityIndicator /> 
          : <UserList data={this.state.results} />}
          <Button
            title="About"
            onPress={() => navigation.navigate('About')} 
          />
          <Button
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
    )
  }
}

class SettingScreen extends Component {
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
        <Text>Settings !</Text>
        <Button
          title="Go Back Home"
          onPress={() => this.props.navigation.navigate('Home')}
        /> 
      </View>
    );
  }
}

class ModalScreen extends Component {
  render() {
    console.log("Modal props:", this.props);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 30}}>I am Modal</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    )
  }
}

class AboutView extends Component {

  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;
    return {
      title : params ? params.otherParams : 'Something Something',
      headerStyle : {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>THIS IS ABOUT VIEW BRU</Text>
        <Button
          title="About Again"
          onPress={() => navigation.push('About')}
        />
        <Button
          title="Go home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      </View>)
  }
}

const Tabs = createBottomTabNavigator({
  Home: HomeView,
  Settings : SettingScreen
},{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  },
}
)

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeView
    },
    About: {
      screen: AboutView,
    },
    initialScreen: {
      screen: 'Home'
    },
  },{
    navigationOptions : {
      title: 'Home',
      headerStyle: {
        backgroundColor: 'darkslategrey',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
    Tabs: {
      screen: Tabs
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends Component {

  // state = {
  //   results: []
  // }

  // componentDidMount() {
  //   axios.get('http://localhost:3000/getemall')
  //   .then(res => {
  //     console.log(res)
  //     this.setState({results: [...res.data]})
  
  //   })
  //   .catch(e => console.log(e))
  // } 

  render() {
    // const {results} = this.state
    // console.log("Results", results)
    return <RootStack/>;
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
