import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import CarouselComponent from '../components/carousel';
import navigationService from '../route/navigationService';
import firestore from '@react-native-firebase/firestore';
import FIcon from 'react-native-vector-icons/Ionicons';

import {loading, success} from '../actions/generalActions';

let userArray = [];

const HomePage = () => {
  const userInfo = useSelector(state => state.general.userInfo);
  const dispatch = useDispatch();
  const getUsers = () => {
    dispatch(loading());
    if (userArray.length == 0) {
      firestore()
        .collection('Users')
        .get()
        .then(snap => {
          snap.forEach(async snp => {
            userArray.push(snp?.id);
          });
          dispatch(success());
          navigationService.navigate('PatientList', {data: userArray});
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      dispatch(success());
      navigationService.navigate('PatientList', {data: userArray});
    }
  };
  const Slides = [
    <Image
      source={require('../images/health6.png')}
      style={{
        height: 250,
        width: 400,
      }}
      resizeMode="contain"
    />,
    <Image
      source={require('../images/health5.png')}
      style={{
        height: 250,
        width: 400,
      }}
      resizeMode="contain"
    />,
    <Image
      source={require('../images/health1.png')}
      style={{
        height: 250,
        width: 400,
      }}
      resizeMode="contain"
    />,
    <Image
      source={require('../images/health2.png')}
      style={{
        height: 250,
        width: 400,
      }}
      resizeMode="contain"
    />,
    <Image
      source={require('../images/health3.png')}
      style={{
        height: 250,
        width: 400,
      }}
      resizeMode="contain"
    />,
    <Image
      source={require('../images/heath4.png')}
      style={{
        height: 250,
        width: 400,
      }}
      resizeMode="contain"
    />,
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: '#48c2c2',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '400',
            color: 'white',
          }}>
          Hello {userInfo?.name}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: 'white',
            width: 200,
            lineHeight: 30,
            marginTop: 20,
          }}>
          {userInfo?.userRole == 'staff'
            ? 'its time to check your feed'
            : 'Its time to check your blood sugar level'}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 10,
          marginHorizontal: 30,
          borderRadius: 20,
          padding: 20,
          marginTop: 30,
        }}
        activeOpacity={0.75}
        disabled={userInfo?.userRole == 'patient'}
        onPress={getUsers}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: 'gray',
            width: 200,
            lineHeight: 20,
            alignSelf: userInfo?.userRole == 'staff' ? 'center' : 'flex-start',
          }}>
          {userInfo?.userRole == 'staff'
            ? 'Monitor Your Patient'
            : 'Its time to check your blood sugar level'}
        </Text>
        {userInfo?.userRole == 'staff' && (
          <FIcon
            name="arrow-forward-circle-outline"
            style={{
              color: 'black',
              fontSize: 36,
              position: 'absolute',
              right: 10,
              top: 10,
            }}
          />
        )}
        {userInfo?.userRole == 'patient' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#5396e3',
                alignSelf: 'flex-start',
                borderRadius: 30,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 20,
              }}
              activeOpacity={0.75}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}>
                <Icon
                  style={{
                    color: 'white',
                    fontSize: 20,
                  }}
                  name="thumbs-up"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'white',
                    marginLeft: 5,
                  }}>
                  Yes I did
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#ebeef3',
                alignSelf: 'flex-start',
                borderRadius: 30,
              }}
              activeOpacity={0.75}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}>
                <Icon
                  style={{
                    color: 'gray',
                    fontSize: 20,
                  }}
                  name="thumbs-down"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'gray',
                    marginLeft: 5,
                  }}>
                  No i didn't
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      {userInfo?.userRole == 'staff' ? (
        <CarouselComponent
          slides={Slides}
          style={{paddingBottom: 20, marginTop: 30}}
        />
      ) : (
        <>
          <Image
            source={require('../images/trust.png')}
            style={{
              height: '40%',
              width: '80%',
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </>
      )}

      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: 'gray',
          marginLeft: 5,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        Satisfaction Feedback by different users
      </Text>
    </View>
  );
};

export default HomePage;
