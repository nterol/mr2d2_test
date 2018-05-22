import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    ActivityIndicator,
    StyleSheet,
    StatusBar
} from 'react-native';

export class LoadingScreen extends Component {
    
    getAsyncStorage = async () => {
        const user = await AsyncStorage.getItem('logged');
        this.navigation.navigate(user ? 'App' : 'Auth');
    };

    render() {
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar hidden={true}/>
            </View>
        )
    }
}

const styles= Stylesheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});