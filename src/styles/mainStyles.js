// L'idée est que l'on défini les styles par components 
// et on les export dans l'index

import {StyleSheet} from 'react-native';

export const mainStyles = StyleSheet.create({
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