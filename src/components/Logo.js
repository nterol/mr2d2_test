import React, {Component} from 'react';
import {Image} from 'react-native';

export default class Logo extends Component {
  render () {
    return (
      <Image
        source={require('../assets/beacon.png')}
        style={{width: 50, height: 50}}
      />
    );
  }
}