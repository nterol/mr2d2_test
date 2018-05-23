// L'idée est que l'on défini les styles par components 
// et on les export dans l'index

import {StyleSheet} from 'react-native'

export const formStyles = StyleSheet.create({
    styleTitle: {
        fontSize: 30, 
        fontWeight: 'bold'
    },
    containerStyle: {
        paddingHorizontal: 5, 
        width: 350, 
        height: 400, 
        marginTop: 10, 
        borderRadius: 10
    },
    buttonStyle: { 
        marginTop: 20, 
        borderRadius: 10 
    }
});