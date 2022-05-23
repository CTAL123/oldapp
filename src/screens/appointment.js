import React, {useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';

import navigationService from '../route/navigationService';
import SuccessAnimation from '../components/successAnimation';
import {useDispatch, useSelector} from 'react-redux';

const FitnessTaskCard = props => {
  return (
    <View
      style={{
        backgroundColor: '#f9f9ff',
        borderRadius: 20,
        marginTop: 30,
        marginHorizontal: 30,
        shadowColor: 'white',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 10,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          color: 'black',
          marginLeft: 20,
          marginTop: 25,
        }}>
        {props.doctorName}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
          marginTop: 10,
        }}>
        <FIcon style={{fontSize: 16, color: 'black'}} name="clock" />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'gray',
            marginLeft: 5,
          }}>
          {props.routine}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
          marginTop: -5,
        }}>
        <FIcon style={{fontSize: 16, color: 'black'}} name="bell" />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'gray',
            marginLeft: 5,
          }}>
          {props.address}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#8bb8ff',
          bottom: 0,
          right: 0,
          borderBottomRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 15,
          }}
          activeOpacity={0.3}>
          <FIcon style={{fontSize: 16, color: 'white'}} name="trending-up" />

          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: 'white',
              marginLeft: 5,
            }}>
            Booked
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Appointment = () => {
  const userInfo = useSelector(state => state.general.userInfo);
  const appointmentStatus = userInfo?.appointmentStatus;

  return (
    <View style={{backgroundColor: '#272b63', flex: 1}}>
      <View
        style={{
          backgroundColor: '#a4ffd4',
        }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '400',
            color: '#303a87',
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          {userInfo?.userRole == 'staff' ? 'Appointment List' : ' Appointment'}
        </Text>

        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: '#272b63',
            justifyContent: 'center',
            alignItems:
              appointmentStatus || userInfo?.userRole == 'staff'
                ? 'stretch'
                : 'center',
          }}>
          {appointmentStatus || userInfo?.userRole == 'staff' ? (
            <FitnessTaskCard
              doctorName="Morning Walk"
              routine="12 September, 3:00 pm"
              address="Canada"
              onPress={() => {
                navigationService.back();
              }}
            />
          ) : (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  color: '#61ffdf',
                  marginTop: 25,
                }}>
                Oops no appointments booked
              </Text>
              <Image
                source={require('../images/doctor.png')}
                style={{
                  height: 200,
                  width: 200,
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '500',
                  color: '#e8e7ec',
                  marginTop: 25,
                  alignSelf: 'center',
                }}>
                Book a doctor
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  backgroundColor: '#e8e7ec',
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginTop: 50,
                }}
                onPress={() => {
                  navigationService.navigate('BookAppointment');
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#272b63',
                    alignSelf: 'center',
                  }}>
                  Lets Get Started
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Appointment;
