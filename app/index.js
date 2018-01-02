import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StatusBar, View} from 'react-native';

import Navigator from './config/routes';

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
});

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <Navigator />
      </View>
    )
  }
}