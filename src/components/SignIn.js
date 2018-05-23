import React , {Component} from 'react';
import {View, Text, NetInfo, AsyncStorage} from 'react-native';
import {
    Card,
    FormInput,
    FormLabel,
    Button,
    FormValidationMessage
} from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import {formStyles} from '../styles/'

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        warning: '',
        connexion: {},
        already: false
    }

    componentWillMount() {
        console.log('1');
        AsyncStorage.getItem('token')
        .then(user => {
            console.log('4');
            this.setState({...this.state, already: user ? true : false})
        });
    }

    componentDidMount() {

        // Test de la fonction NetInfo.
        console.log('3');
        NetInfo.getConnectionInfo().then(connectionInfo => {
            console.log("GET NET INFO", connectionInfo); 
            this.setState({
                ...this.state, 
                connexion: {...connectionInfo}});
        });
        const connexionChange = NetInfo.addEventListener('connectionChange', (networkType) => {
            console.log("NETWORK CHANGES", networkType);
            this.setState({
                ...this.state, 
                connexion: {...networkType}});
            }
        );
    }


    // On ne fait que récupérer les valeurs changées onChange et les stocker dans le state
    // Equivalent à ecrire function(event) {return this.setState(...);}
    // Sauf que cette écriture typique d'ES6 ne necessite pas de rebinder la méthode dans un constructeur
    setMail = (e) => this.setState({...this.state, email: e});
    setPass = (e) => this.setState({...this.state, password: e});
    
    signInSubmit = () => {
        const {password, email} = this.state;
        const lowEmail = email.toLowerCase();
        const lowPassword= password.toLowerCase();

        // NetInfo.getConnectionInfo().then((connectionInfo) => {
        //     console.log(`NETINFO Initial, type: ${connectionInfo.type}, effectiveType: ${connectionInfo.effectiveType}`);
        //   });

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

                            // Epique moment de destructuring ES6/7
                            const [u] = res.data.user;
                            const {authentication_token: auth} = u;

                            // Voila pourquoi on ne peut pas se contenter de cette solution. 
                            // On ne peut stocker que des chaines de caractères, une par une.
                            // Et c'est une promesse. Donc c'est l'horreur.
                            AsyncStorage.setItem('token', auth);
                            this.props.navigation.navigate('Home');
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
            console.log('2');
            let {
                password, 
                email, 
                warning, 
                connexion, 
                already
            } = this.state;
            const {styleTitle, containerStyle, buttonStyle} = formStyles
            warning !== '' ? setTimeout(() => {
                this.setState({...this.state, warning: ''})
            }, 5000)
            : null;
            return (
                <Card 
                title="Connexion"
                titleStyle={styleTitle}
                containerStyle={containerStyle}
                >
                <FormLabel>Email</FormLabel>
                <FormInput 
                    placeholder="votre mail ici..." 
                    value={email}
                    onChangeText={this.setMail}
                    editable={!already}
                />
                <FormLabel>Password</FormLabel>
                <FormInput 
                    placeholder="...et votre mot de passe là" 
                    secureTextEntry 
                    value={password}
                    onChangeText={this.setPass}
                    editable={!already}
                />
                <FormValidationMessage>{warning}</FormValidationMessage>
                <Text style={{color: "blue"}}>Type de connexion : {connexion.type}</Text>
                <Text style={{color: "blue"}}>Effectivité: {connexion.effectiveType}</Text>
                {already && <FormValidationMessage>Vous êtes déjà connecté !</FormValidationMessage>}
                <Button 
                    onPress={this.signInSubmit}
                    buttonStyle={buttonStyle}
                    backgroundColor="#03A9F4"
                    title="Sign in"
                    disabled={already}
                />
            </Card>
            )
    }
}


// withNavigation permet de forcer l'héritage des navigations props.
export default withNavigation(SignIn);
