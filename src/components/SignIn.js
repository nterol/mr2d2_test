import React , {Component} from 'react';
import {View, Text, NetInfo} from 'react-native';
import {
    Card,
    FormInput,
    FormLabel,
    Button,
    FormValidationMessage,
    AsyncStorage
} from 'react-native-elements';
import axios from 'axios';

const Already = () => (
    <View>
             <Text>Already signed in  !</Text>
             <Button onPress={this.logOff}/>
         </View>
)

export default class SignIn extends Component {

    state = {
        email: '',
        password: '',
        warning: '',
        signedIn: false,
    }

    // componentDidMount() {
    //     check l'AsynStorage pour voir si le user est connecté
    //     si oui alors : 
    //     this.setState({...this.state, signedIn: true})
    // }

    // On ne fait que récupérer les valeurs changé onChange et les stocker dans le state
    // Equivalent à ecrire function(event) {return this.setState(...);}
    // Sauf que cette écriture typique d'ES6 ne necessite pas de rebinder la méthode dans un constructeur
    setMail = (e) => this.setState({...this.state, email: e});
    setPass = (e) => this.setState({...this.state, password: e});
    
    signInSubmit = () => {
        const {password, email} = this.state;
        const lowEmail = email.toLowerCase();
        const lowPassword= password.toLowerCase();

        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log(`NETINFO Initial, type: ${connectionInfo.type}, effectiveType: ${connectionInfo.effectiveType}`);
          });

        // console.log(`À valider :${lowEmail}, ${lowPassword}`);
        // if (lowPassword === 'demos2016' && lowEmail === 'adm105@recette32.com') {
            // NetInfo.isConnected.fetch().then(isConnected => {
            //     if (isConnected) {
                    const data = {
                        "user" : {
                            "email": 'adm105@recette32.com',
                            "password": 'demos2016'
                        }
                    }
                    const url= 'https://api-recette32.mobiler2d2.net/mobileapi/users/sign_in';
                    //La partie qui suit serait traitée en Action/ par redux-thunk...
                    console.log("REQ GO");
                    axios.post( url, data)
                        .then(res => {
                            const [u] = res.data.user;
                            console.log("U : ", u);
                            const {authentication_token: auth} = u;
                            // const auth = u.authentication_token;
                            console.log("AUTH TOKEN", auth);
                            // const [u] = res.data.user;

                            // Voila pourquoi on ne peut pas se contenter de cette solution. 
                            // On ne peut stocker que des chaines de caractères, une par une.
                            // Et c'est une promesse. Donc c'est l'horreur.
                            AsyncStorage.setItem('token', JSON.stringify(auth));
                        })
                        .catch(e => console.log('Axios error', e));
                    // } else {
                    //     this.setState({...this.state, warning: "Vous n'êtes pas encore connecté..."})
                    // }
                // })
            // } else {
            //     this.setState({
            //         ...this.state,
            //         email: '',
            //         password: '',
            //         warning: "Ces identifiants ne sont pas reconnus"
            //     })
            // }

            // J'ai commenté tout ça qui fonctionne pour pouvoir gagner du temps en débogage.
        }
        
        render() {
            let {email, password, warning, signedIn} = this.state;
            warning !== '' ? setTimeout(() => {
                this.setState({...this.state, warning: ''})
            }, 5000)
            : console.log('warning false');
            return (
                <Card 
                title="Sign in"
                titleStyle={{fontSize: 30, fontWeight: 'bold'}}
                containerStyle={{paddingHorizontal: 5, width: 350, height: 400, marginTop: 10, borderRadius: 10}}
                >
                <FormLabel>Email</FormLabel>
                <FormInput
                    containerStyle={{border: 'solid 1px'}} 
                    placeholder="votre mail ici..." 
                    value={email}
                    onChangeText={this.setMail}
                />
                <FormLabel>Password</FormLabel>
                <FormInput 
                    placeholder="...et votre mot de passe là" 
                    secureTextEntry 
                    value={password}
                    onChangeText={this.setPass}
                />
                <FormValidationMessage>{warning}</FormValidationMessage>
                <Button 
                    onPress={this.signInSubmit}
                    buttonStyle={{ marginTop: 20, borderRadius: 10 }}
                    backgroundColor="#03A9F4"
                    title="Sign in"
                />
            </Card>
        )
    }
}