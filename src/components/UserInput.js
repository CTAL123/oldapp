import React from 'react';
import {StyleSheet, View, TextInput, Image, Dimensions} from 'react-native';

const UserInput = props => {
  return (
    <View style={styles.inputWrapper}>
      <Image source={props.source} style={styles.inlineImg} />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}
        returnKeyType={props.returnKeyType}
        placeholderTextColor="black"
        underlineColorAndroid="transparent"
        onChangeText={input => {
          props.returnValue(input);
        }}
      />
    </View>
  );
};
export default UserInput;

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    width: DEVICE_WIDTH - 40,
    height: 55,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: 'black',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 10,
  },
  inputWrapper: {
    // flex: 1,
    marginTop: 10,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 15,
    tintColor: 'black',
  },
});
