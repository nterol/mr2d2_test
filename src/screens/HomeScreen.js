import React, {Component} from 'react';
import {
  View, 
  Button, 
  ActivityIndicator,
  NetInfo,
  AsyncStorage
} from 'react-native';
import Logo from '../components/Logo';


export default class HomeScreen extends Component {

    state = {
      logIn: false
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

    componentWillMount() {
      AsyncStorage.getItem('token')
      .then(user => this.setState({logIn : user ? true : false})) 
      // Et donc on voit ici que cette logique repete complètement
      // Ce qui est fait dans le component SignIn. 
      // Avec un store on pourrait l'abstraire à l'ensemble des components
    }

    asyncLogOff = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');        
    }
  
    render() {
      const {navigation} = this.props;
      let {results} = this.state;
      return (
          <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button
                title={this.state.logIn ? "Déconnexion" : "Connexion"}
                onPress={this.asyncLogOff}
              />
          </View>
      )
    }
  }
  