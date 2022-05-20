import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import navigationService from '../route/navigationService';

export default class SignupSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.text}>New user , </Text>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              navigationService.navigate('SignUpForm');
            }}>
            <Text style={styles.textDark}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    width: DEVICE_WIDTH,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  textDark: {
    color: 'purple',
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
  },
});
