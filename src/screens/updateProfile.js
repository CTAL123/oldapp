import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import navigationService from '../route/navigationService';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome5';

import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import usernameImg from '../images/username.png';
import email from '../images/email.png';

import UserInput from '../components/UserInput';
import {loading, success, updateUserInfo} from '../actions/generalActions';

const UserCard = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        navigationService.navigate('EditOption', {
          option: props.heading,
          optionData: props.subHeading,
        });
      }}
      style={props.style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 6,
        }}>
        <View>
          <Text style={styles.cardHeading}>{props.heading}</Text>
          <Text style={[styles.preferenceStyle, {marginTop: 6}]}>
            {props.subHeading instanceof Object
              ? props.subHeading?.status
              : props.subHeading}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FIcon
            style={{
              fontSize: 22,
              color: 'black',
              marginLeft: 8,
            }}
            name="chevron-right"
          />
        </View>
      </View>
      <View
        style={{
          marginVertical: 8,
          height: 1,
          backgroundColor: 'rgba(73, 74, 126,0.3)',
          marginHorizontal: 6,
        }}
      />
    </TouchableOpacity>
  );
};
const UpdateProfile = () => {
  const UserInfo = useSelector(state => state.general.userInfo);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: UserInfo.name,
    email: UserInfo.email,
  });

  const saveUpdatedData = () => {
    try {
      firestore()
        .collection('Users')
        .doc(UserInfo?.name.toString())
        .update({
          name: userInfo.name,
          email: userInfo.email,
        })
        .then(() => {
          firestore()
            .collection('Users')
            .doc(UserInfo?.name)
            .get()
            .then(Info => {
              dispatch(
                updateUserInfo({
                  ...Info?._data,
                }),
              );
              dispatch(success());
              navigationService.back();
            })
            .catch(error => {
              console.log(error);
              // console.log('data reached here not');

              dispatch(success());
            });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFA',
          paddingVertical: 18,
          paddingHorizontal: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 20,
          },
          shadowOpacity: 1,
          shadowRadius: 30,
          elevation: 20,
          marginHorizontal: -20,
        }}>
        <Icon
          name="md-arrow-back-circle-outline"
          style={{
            color: 'black',
            fontSize: 36,
          }}
          onPress={() => {
            navigationService.back();
          }}
        />
        <Text style={styles.nameStyle}>Profile Info</Text>
        <View />
      </View>
      <View style={{marginTop: 20}} />
      <UserInput
        placeholder={UserInfo?.name}
        source={usernameImg}
        autoCapitalize={'none'}
        returnKeyType={'done'}
        autoCorrect={false}
        returnValue={text => {
          setUserInfo({...userInfo, name: text});
        }}
      />
      <UserInput
        source={email}
        placeholder={UserInfo?.email}
        autoCapitalize={'none'}
        returnKeyType={'done'}
        autoCorrect={false}
        returnValue={text => {
          setUserInfo({...userInfo, name: text});
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(loading());
          saveUpdatedData();
        }}
        activeOpacity={0.7}>
        <Text style={styles.loginText}>Update Profile</Text>
      </TouchableOpacity>
      {/* <UserCard
        heading="education level"
        style={{marginTop: 20}}
        subHeading={userInfo?.name}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  nameStyle: {
    fontSize: 24,
    color: 'black',
    textTransform: 'capitalize',
    lineHeight: 26,
  },
  textHeading: {
    fontSize: 16,
    color: '#AEAEAE',
    textTransform: 'capitalize',
    marginTop: 20,
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
  cancelDone: {
    fontSize: 18,
    color: 'black',
    textTransform: 'capitalize',
  },
  cardHeading: {
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize',
    marginTop: 5,
    lineHeight: 22,
  },
  preferenceStyle: {
    fontSize: 14,
    color: '#797A83',
    textTransform: 'capitalize',
    lineHeight: 20,
  },
});
export default UpdateProfile;
