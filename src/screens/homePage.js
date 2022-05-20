import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

const HomePage = () => {
  const userInfo = useSelector(state => state.general.userInfo);
  console.log('object', userInfo);
  return (
    <View
      style={{
        backgroundColor: '#48c2c2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}>
      <Text style={{fontSize: 26, fontWeight: '400', color: 'white'}}>
        Hello {userInfo?.name}
      </Text>
    </View>
  );
};

export default HomePage;
