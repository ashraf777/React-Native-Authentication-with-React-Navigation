import React from 'react';
import { StatusBar, StyleSheet, View, AsyncStorage, Text } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { LoginButton, RegistrationButton, LogoutButton } from '../components/Button';

const ACCESS_TOKEN = 'access_token';

class Home extends React.Component {

  constructor(props){
      super(props);

      this.state ={
          accessToken: "",
      }
  }    

  async componentDidMount() {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (token) {
      this.setState({ accessToken: token });
      console.log(token);
      this.props.navigation.navigate('Main');
    } else {
      this.setState({ accessToken: false });
    }
  }

  handleLoginButtonPress = () => {
    this.props.navigation.navigate('Login');
  };
  handleRegistrationButtonPress = () => {
    this.props.navigation.navigate('Registration');
  };
  handleLogoutButtonPress = () => {
    try {
        AsyncStorage.removeItem(ACCESS_TOKEN);
    } catch(error) {
        console.log("Something went wrong")
    }
  }

  render() {
    if (!this.state.accessToken) {
      return (
        <Container> 
          <StatusBar translucent={false} barStyle="light-content" />
          <Logo />    
          <View style={styles.buttonContainer}>
            <LoginButton onPress={this.handleLoginButtonPress}/>
            <RegistrationButton onPress={this.handleRegistrationButtonPress}/>
          </View>
        </Container>
      );
    } else {
      return (
        <Container> 
          <StatusBar translucent={false} barStyle="light-content" />
          <Logo /> 
          <View style={styles.buttonContainer}>
            <LogoutButton onPress={this.handleLogoutButtonPress}/>
          </View>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
});

export default Home;
