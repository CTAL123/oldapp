import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';

import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserInput from '../components/UserInput';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';

import email from '../images/email.png';
import {loading, success, updateUserInfo} from '../actions/generalActions';
import Toast from 'react-native-toast-message';
import bgSrc from '../images/wallpaper.png';
import navigationService from '../route/navigationService';

let userRole = '';
let newUser = true;
let userArray = [];

export const SignUpForm = () => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    reTypedPassword: '',
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleTextChange = text => {};

  const userSignup = async () => {
    const userData = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      userRole,
    };
    try {
      await firestore()
        .collection('Users')
        .doc(userInfo.name)
        .set(userData)
        .then(() => {
          AsyncStorage.setItem(
            'KeyIsUser',
            JSON.stringify({userName: userInfo?.name}),
          );

          dispatch(updateUserInfo(userData));
          navigationService.navigateReset('HomepageStack');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'User registered successfully',
          });
          dispatch(success());
        });
    } catch (error) {
      console.log(error);
    }
  };

  const disableLogic = () => {
    if (userInfo.name == '' || userInfo.email == '') {
      setDisableButton(false);
    }
  };
  const checkValidPassword = () => {
    if (userInfo.password == userInfo.reTypedPassword) {
      if (userInfo.password.length < 8) {
        console.log('data reached here');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Password length less than 8 digit',
        });
      } else {
        dispatch(loading());
        firestore()
          .collection('Users')
          .get()
          .then(snap => {
            snap.forEach(snp => {
              console.log('snapshot is here', snp.id);
              if (snp.id == userInfo.name) {
                dispatch(success());
                newUser = false;
              }
            });
            if (newUser) {
              userSignup();
            } else {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Username already exists',
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password is not matching',
      });
    }
  };
  return (
    <ImageBackground style={styles.picture} source={bgSrc}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>Create Account</Text>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          returnValue={text => {
            setUserInfo({...userInfo, name: text});
            disableLogic();
          }}
        />
        <UserInput
          source={email}
          placeholder="Email"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          returnValue={text => {
            setUserInfo({...userInfo, email: text});
            disableLogic();
          }}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={false}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnValue={text => {
            setUserInfo({...userInfo, password: text});
          }}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={false}
          placeholder="Re-type password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnValue={text => {
            setUserInfo({...userInfo, reTypedPassword: text});
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            checkValidPassword();
            userRole = 'patient';
          }}
          disabled={disableButton}
          activeOpacity={0.7}>
          <Text style={styles.loginText}>Sign in as patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            checkValidPassword();
            userRole = 'staff';
          }}
          activeOpacity={0.7}>
          <Text style={styles.loginText}>Sign in as Staff</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: 'white', backgroundColor: 'transparent'}}>
            Already have account ,{' '}
          </Text>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              navigationService.back();
            }}>
            <Text style={styles.textDark}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUpForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: '#f86df3',
    height: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
  textDark: {
    color: 'purple',
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  loginText: {
    fontSize: 20,
  },
});
