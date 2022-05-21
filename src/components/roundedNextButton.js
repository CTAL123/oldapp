import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const RoundedNextButton = props => {
  return (
    <TouchableOpacity
      disabled={props.disable}
      onPress={() => props.onPress()}
      style={[
        {
          backgroundColor: props.condition ? '#FFFFFF' : '#8338EC',
          borderRadius: 25,
          marginHorizontal: 50,
          paddingVertical: props.paddingVertical,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: props.marginTop,
          // position: 'absolute',
          // top: variables.screenHeight - 110,
        },
        props.style,
      ]}>
      <Text
        style={{
          fontSize: 20,
          color: props.condition ? '#9F9F9F' : 'white',
          marginHorizontal: 30,
        }}>
        CONTINUE
      </Text>
    </TouchableOpacity>
  );
};

RoundedNextButton.defaultProps = {
  marginTop: 70,
  style: {},
  condition: false,
  paddingVertical: 10,
};
export default RoundedNextButton;
