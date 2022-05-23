import React, {Component} from 'react';

import {StyleSheet, View} from 'react-native';

export default class Wallpaper extends Component {
  render() {
    return <View style={styles.picture}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    backgroundColor: 'white',
  },
});
