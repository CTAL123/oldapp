import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import {useDispatch} from 'react-redux';
import {updateUserInfo, success} from '../actions/generalActions';
import LottieView from 'lottie-react-native';

import navigationService from '../route/navigationService';
import {Colors} from '../assets';

// const splashTime=0
let userArray = [];
const SplashScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigateToHome();
  }, []);

  const navigateToHome = () => {
    AsyncStorage.getItem('KeyIsUser').then(async userName => {
      let userInfoJSON = JSON.parse(userName);

      const userRole = (() =>
        userInfoJSON?.userRole == 'staff' ? 'Staff' : 'Users')();
      console.log(userInfoJSON);
      if (userInfoJSON != null) {
        await firestore()
          .collection(`${userRole}`)
          .doc(userInfoJSON?.name.toString())
          .get()
          .then(userInfo => {
            console.log('user data splash', userInfo?._data);
            dispatch(
              updateUserInfo({
                ...userInfo?._data,
              }),
            );
            setTimeout(() => {
              navigationService.navigateReset('HomepageStack');
            }, 4000);
          })
          .catch(error => {
            crashlytics().recordError(error);
            // console.log(error);
          });
      } else {
        setTimeout(() => {
          navigationService.navigateReset('LoginScreen');
        }, 4000);
      }
    });
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../images/splashAnimation.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
