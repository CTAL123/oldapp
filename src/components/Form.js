import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
  Keyboard,
} from 'react-native';

import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserInput from './UserInput';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import {loading, success, updateUserInfo} from '../actions/generalActions';
import Toast from 'react-native-toast-message';
import navigationService from '../route/navigationService';

let userArray = [];
const Form = () => {
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(true);

  const [userInfo, setUserInfo] = useState({name: '', password: ''});

  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then(snap => {
        snap.forEach(async snp => {
          userArray.push(snp?.id);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const userSignup = async () => {
    try {
      if (userArray.includes(userInfo.name)) {
        await firestore()
          .collection('Users')
          .doc(userInfo.name)
          .get()
          .then(user => {
            if (user?._data?.password == userInfo?.password) {
              dispatch(success());
              dispatch(
                updateUserInfo({
                  ...user?._data,
                }),
              );
              navigationService.navigateReset('HomepageStack');
              AsyncStorage.setItem(
                'KeyIsUser',
                JSON.stringify({userName: userInfo?.name}),
              );
            } else {
              dispatch(success());
              Toast.show({
                type: 'error',
                text1: 'Password Incorrect',
                text2: 'Enter your own password',
              });
            }
          })
          .catch(error => {
            // console.log(error);
            dispatch(success());
          });
      } else {
        dispatch(success());
        Toast.show({
          type: 'error',
          text1: 'New user?',
          text2: 'No user found with username',
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(success());
    }
  };

  const toggleShowPass = () => {
    setShowPass(prev => !prev);
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          returnValue={text => {
            setUserInfo({...userInfo, name: text});
          }}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnValue={text => {
            setUserInfo({...userInfo, password: text});
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={toggleShowPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Keyboard.dismiss();
          dispatch(loading());

          userSignup();
        }}
        activeOpacity={0.7}>
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>
    </>
  );
};

export default Form;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 85,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  button: {
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: '#f86df3',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
});
