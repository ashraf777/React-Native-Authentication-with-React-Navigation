import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import styles from './styles';

const RegistrationButton = ({ onPress }) => (
      <TouchableOpacity
        style={styles.toolbarButton}
        onPress={onPress}
      >
      <Text style={{color: '#fff'}}> Registration </Text>
      </TouchableOpacity>
);

export default RegistrationButton;