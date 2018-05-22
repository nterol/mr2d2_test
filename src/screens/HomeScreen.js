import React, {Component} from 'react';
import {View, Button, ActivityIndicator} from 'react-native';
import Logo from '../components/Logo';


export default class HomeScreen extends Component {

    state = {
      results: []
    }
    static navigationOptions = ({navigation}) => {
      const params = navigation.state.params || {};
      return {
        title: 'Home',
        headerLeft:{
        headerTitle: <Logo />
        },
        headerRight: (
          <Button
            onPress={() => navigation.navigate('Auth')}
            title="HEY"
            color= "#000"
          />
        )
      }
    }

    logOff = () => {
        
    }
  
    render() {
      const {navigation} = this.props;
      let {results} = this.state;
      return (
          <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button
                title="Sign in !"
                onPress={() => navigation.navigate('Auth')}
                />
          </View>
      )
    }
  }
  