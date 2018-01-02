import React from 'react';
import { StatusBar, View, Text, StyleSheet, AsyncStorage } from 'react-native';

import { Container } from '../components/Container';

import { Logo } from '../components/Logo';
import { LogoutButton } from '../components/Button';

const ACCESS_TOKEN = 'access_token';

class Main extends React.Component {

    handleLogoutButtonPress = () => {
        try {
            AsyncStorage.removeItem(ACCESS_TOKEN);
            this.props.navigation.navigate('Home'); 
            console.log("Logged Out")
        } catch(error) {
            console.log("Something went wrong")
        }
    }

    render() {
        return (
            <Container>
                <StatusBar translucent={false} barStyle="light-content" />
                <Logo />
                <View style={styles.buttonContainer}>
                    <LogoutButton onPress={this.handleLogoutButtonPress}/>
                </View>
            </Container> 
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
});

export default Main;