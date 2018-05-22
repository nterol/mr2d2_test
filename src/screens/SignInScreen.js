import React, {Component} from 'react';
import SignIn from '../components/SignIn';
import {View, Button} from 'react-native';

export default class SignInScreen extends Component {
  render() {
    console.log("SignIn props:", this.props);
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <SignIn />
        <Button title="Home"
        onPress={() => navigation.navigate('Home')}
        />
      </View>
    )
  }
}