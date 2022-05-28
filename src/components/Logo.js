import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import oldImage from '../images/old.png';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={oldImage} style={styles.image} />
        <Text style={styles.text}>Older me</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: 'black',
    fontWeight: '500',
    backgroundColor: 'transparent',
    fontSize: 25,
    marginTop: 20,
  },
});
