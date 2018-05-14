import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

const _renderItem = ({item}) => {
    console.log("ITEM", item);
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent:'center', flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row', borderRadius: '5px', border: ''}}>
            <Text>{item.beacon > 0 ? "Lit" : "unLit"}</Text>
            <Text>{item.username}</Text>
        </View>);
}

export default (UserList = props => (
    <FlatList data={props.data} renderItem={_renderItem} />
));

const styles = StyleSheet.create({ container: { flex: 1, paddingTop: 20 } });