import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import Main from '../screens/Main';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
      backgroundColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: 0,
      left: 0,
      right: 0,
    },
});

const Navigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerStyle: styles.header,
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerStyle: styles.header,
      }
    },
    Registration: {
      screen: Registration,
      navigationOptions: {
        headerStyle: styles.header,
      }
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerStyle: styles.header,
        headerLeft: null,
      }
    },
  },
  {
    headerMode: 'screen',
  },
)

export default Navigator;