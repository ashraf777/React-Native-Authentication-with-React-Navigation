import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

const Logo = () => (
    <View style={styles.container}>
        <Image resizeMode="contain" style={styles.containerImage} source={require('./images/logo.png')}></Image>    
    </View>
);

export default Logo;