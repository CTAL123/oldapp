import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
  Keyboard,
  View,
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
  useEffect(() => {
    firestore()
      .collection('Staff')
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

  console.log('both user username', userArray);
  const userPatientSignup = async () => {
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
                JSON.stringify({...user?._data}),
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
  const userStaffSignup = async () => {
    try {
      if (userArray.includes(userInfo.name)) {
        await firestore()
          .collection('Staff')
          .doc(userInfo?.name)
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
                JSON.stringify({...user?._data}),
              );
            } else {
              dispatch(success());
              Toast.show({
                type: 'error',
                text1: 'Password Incorrect',
                text2: 'Enter your own password',
              });
            }
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

          userPatientSignup();
        }}
        activeOpacity={0.7}>
        <Text style={styles.text2}>LOGIN As PATIENT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {marginTop: 20}]}
        onPress={() => {
          Keyboard.dismiss();
          dispatch(loading());

          userStaffSignup();
        }}
        activeOpacity={0.7}>
        <Text style={styles.text2}>LOGIN AS STAFF</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ff5e1e',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          marginHorizontal: 40,
          margin: 20,
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
    </>
  );
};

export default Form;
const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  text2: {
    color: 'black',
    backgroundColor: 'transparent',
  },
  textDark: {
    color: '#32eaff',
    textDecorationLine: 'underline',
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
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
