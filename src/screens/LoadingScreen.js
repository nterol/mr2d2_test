import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    ActivityIndicator,
    StyleSheet,
    StatusBar
} from 'react-native';
import Logo from '../components/Logo';

export default class LoadingScreen extends Component {

    //

    constructor() {
        super();
        this.getAsyncStorage();
    }
    
    getAsyncStorage = async () => {
        console.log('Init');
        const user = await AsyncStorage.getItem('token');
        console.log(`Done, user : ${user}`);
        this.props.navigation.navigate(user ? 'Home' : 'Auth');
    };


    render() {
        return (
            <View style={styles.container}>
                <Logo/>
                <ActivityIndicator/>
                <StatusBar hidden={true}/>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});