import React from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    KeyboardAvoidingView, 
    StatusBar,
    StyleSheet, 
    AsyncStorage
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';

import PropTypes from 'prop-types';

import styles from '../components/Forms/styles';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';

const ACCESS_TOKEN = 'access_token';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main'})
    ]
})

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            username: "",
            password: "",
            error: ""
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (token !== null) {
            this.props.navigation.navigate('Main'); 
        }
    }
    

    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            this.getToken();
        } catch(error) {
            console.log("Something went wrong")
        }
    }

    async getToken() {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);            
            console.log("token is:" + token);
        } catch(error) {
            console.log("Something went wrong")
        }
    }

    async onLoginButtonPress() {
        try {
            let response = await fetch('http://evwwa.com/corporate_track/index.php', {
                method: 'POST',
                headers: {
                    "optcode": "login",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });
            let res = await response.json();
            if (response.status >= 200 && response.status < 300) {
                this.setState({error: ""});
                let accessToken = res.accesstoken;
                this.storeToken(accessToken);                       
                console.log("Response success is: " + accessToken); 
                if(!accessToken) {
                    this.props.navigation.navigate('Home');
                } else {
                    this.props.navigation.dispatch(resetAction);
                }
            } else {
                let error = res;
                throw error;
            }
        } catch(error){
            console.log("catch error: " + error);
            let formError = JSON.parse(error);
            let errorArray = [];
            for(let key in formError) {
                if(formError[key].length > 1){
                    formError[key].map(error => errorArray.push(`${key} ${error}`))
                } else {
                    errorArray.push(`${key} ${formError[key]}`)
                }
            }
            this.setState({error: errorArray});
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style = {styles.container}>
                <StatusBar translucent={false} barStyle="light-content" />
                <Logo />
                <View>
                    <TextInput style = {styles.input} 
                                onChangeText={(val) => this.setState({username: val})} 
                                keyboardType='email-address' 
                                placeholder='Email or Mobile Num' 
                                placeholderTextColor='rgba(225,225,225,0.7)'
                                underlineColorAndroid='transparent'/>

                    <TextInput style = {styles.input} 
                                onChangeText={(val) => this.setState({password: val})}  
                                placeholder='Password' 
                                placeholderTextColor='rgba(225,225,225,0.7)' 
                                underlineColorAndroid='transparent'
                                secureTextEntry/>

                    <TouchableOpacity style={styles.buttonContainer} 
                                        onPress={this.onLoginButtonPress.bind(this)}>
                                <Text  style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity> 
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default Login;