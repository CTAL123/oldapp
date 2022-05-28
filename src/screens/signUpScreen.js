import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';

import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePickerComponent from 'react-native-date-picker';

import UserInput from '../components/UserInput';
import eyeImg from '../images/eye_black.png';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import email from '../images/email.png';

import {loading, success, updateUserInfo} from '../actions/generalActions';
import Toast from 'react-native-toast-message';
import navigationService from '../route/navigationService';
import moment from 'moment';
import RoundedNextButton from '../components/roundedNextButton';
import AlertModal from '../components/twoButtonAlert';

let userRole = '';
let newUser = true;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SignUpForm = () => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    reTypedPassword: '',
    dob: new Date(),
  });
  const [disableButton, setDisableButton] = useState(true);
  const [showPass1, setShowPass1] = useState(true);
  const [showPass2, setShowPass2] = useState(true);

  const [showDateComponent, setShowDateComponent] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleDOBChange = value => {
    setUserInfo({...userInfo, dob: value});
  };

  const userSignup = async () => {
    const userData = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      userAge,
      appointmentStatus: false,
      userRole,
    };
    try {
      await firestore()
        // .collection([userRole == 'staff' ? 'Staff' : 'Users'])
        .collection((() => (userRole == 'staff' ? 'Staff' : 'Users'))())
        .doc(userInfo.name)
        .set(userData)
        .then(() => {
          AsyncStorage.setItem('KeyIsUser', JSON.stringify({...userData}));

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

  const currentDate = new Date();

  const selectedDate = userInfo.dob;

  //get teh current user Age

  const selectedAge = moment(new Date()).diff(moment(selectedDate), 'month');

  const roundAgeValue = Math.round(selectedAge / 12);
  const userAge = selectedAge / 12;

  const fullDate = `${selectedDate.getFullYear()}-${
    selectedDate.getMonth() + 1
  }-${selectedDate.getDate()}`;

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
              if (userRole == 'patient') {
                setShowDateComponent(true);
              } else {
                dispatch(loading());
                userSignup();
              }
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
    <View style={{backgroundColor: 'white', flex: 1}}>
      <AlertModal
        isVisible={alert}
        body="Please confirm your Age"
        text={`Age ${roundAgeValue}`}
        but1="Confirm"
        but2="Edit"
        but1Action={() => {
          setAlert(false);
          dispatch(loading());
          userSignup();
        }}
        but2Action={() => {
          setAlert(false);
        }}
      />
      {showDateComponent ? (
        <View>
          <Text style={styles.text2}>Provide your age to proceed</Text>
          <DatePickerComponent
            mode="date"
            fadeToColor={('color', 'none')}
            locale={'en'}
            date={userInfo.dob}
            dividerHeight={5}
            textColor="black"
            onDateChange={handleDOBChange}
            style={styles.datePicker}
            androidVariant="iosClone"
            minimumDate={new Date(`${currentDate.getFullYear() - 100}-12-31`)}
            maximumDate={new Date(`${currentDate.getFullYear()}-12-31`)}
          />
          {userAge >= 20 ? (
            <>
              <Text style={styles.age}>Age {roundAgeValue}</Text>
            </>
          ) : (
            <Text style={styles.validateAge}>Please Provide proper age</Text>
          )}
          <RoundedNextButton
            onPress={() => setAlert(true)}
            disable={!(userAge >= 20)}
            condition={!(userAge >= 20)}
          />
        </View>
      ) : (
        <View style={styles.picture}>
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
            <View>
              <UserInput
                source={passwordImg}
                secureTextEntry={showPass1}
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
                onPress={() => {
                  setShowPass1(prev => !prev);
                }}>
                <Image source={eyeImg} style={styles.iconEye} />
              </TouchableOpacity>
            </View>
            <View>
              <UserInput
                source={passwordImg}
                secureTextEntry={showPass2}
                placeholder="Re-type password"
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                returnValue={text => {
                  setUserInfo({...userInfo, reTypedPassword: text});
                }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnEye}
                onPress={() => {
                  setShowPass2(prev => !prev);
                }}>
                <Image source={eyeImg} style={styles.iconEye} />
              </TouchableOpacity>
            </View>
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
                backgroundColor: '#ff5e1e',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
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
        </View>
      )}
    </View>
  );
};

export default SignUpForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  validateAge: {
    fontSize: 16,
    color: '#8338EC',
    marginTop: 40,
    fontFamily: 'NotoSans-Regular',
    marginHorizontal: 50,
    alignSelf: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 25,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  age: {
    fontSize: 26,
    color: 'black',
    marginTop: 50,
    marginHorizontal: 30,
    alignSelf: 'center',
  },
  datePicker: {
    backgroundColor: 'white',
    marginTop: windowHeight / 12,
    width: windowWidth,
  },
  text2: {
    fontSize: 28,
    color: 'black',
    marginTop: 30,
    fontFamily: 'NotoSans-Bold',
    marginHorizontal: 20,
  },
  button: {
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: 'white',
    height: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
  textDark: {
    color: '#32eaff',
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
  },
  loginText: {
    fontSize: 20,
  },
});
