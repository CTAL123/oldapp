import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch, useSelector} from 'react-redux';
import navigationService from '../route/navigationService';
import {successAnimation, updateUserInfo} from '../actions/generalActions';
import firestore from '@react-native-firebase/firestore';

const FitnessTaskCard = props => {
  return (
    <View
      style={{
        backgroundColor: '#f9f9ff',
        borderRadius: 20,
        marginHorizontal: 30,
        marginTop: 30,
        shadowColor: '#000',
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
          onPress={props.onPress}
          activeOpacity={0.3}>
          <FIcon style={{fontSize: 16, color: 'white'}} name="trending-up" />

          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: 'white',
              marginLeft: 5,
            }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BookAppointment = () => {
  const userInfo = useSelector(state => state.general.userInfo);
  const dispatch = useDispatch();
  console.log('object', userInfo);

  const saveUpdatedData = () => {
    try {
      firestore()
        .collection('Users')
        .doc(userInfo?.name.toString())
        .update({
          appointmentStatus: true,
        })
        .then(() => {
          firestore()
            .collection('Users')
            .doc(userInfo?.name)
            .get()
            .then(userInfo => {
              dispatch(
                updateUserInfo({
                  ...userInfo?._data,
                }),
              );
              navigationService.back();
            })
            .catch(error => {
              console.log(error);
              // console.log('data reached here not');
            });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const success = () => {
    dispatch(successAnimation(true));
    setTimeout(() => {
      dispatch(successAnimation(false));
      saveUpdatedData();
    }, 3000);
  };

  const TwoButtonAlert = () => {
    Alert.alert('Are you sure', 'Your appointment will be booked', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => success()},
    ]);
  };
  return (
    <View style={{backgroundColor: '#e8e7ec', flex: 1}}>
      <ScrollView
        style={{
          backgroundColor: '#e8e7ec',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 30,
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
          <Text
            style={{
              fontSize: 26,
              fontWeight: '600',
              color: '#303a87',
              alignSelf: 'center',
            }}>
            Book Appointment
          </Text>
          <View />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 30,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#303a87',
              marginTop: 25,
            }}>
            Your Appointments
          </Text>
          <Image
            source={require('../images/circleDoctor.png')}
            style={{
              height: 80,
              width: 80,
              marginTop: 20,
            }}
          />
        </View>
        <FitnessTaskCard
          doctorName="Dr. Kamal Bhandari"
          routine="16 june 2022,  7:00 am"
          address="Australia"
          onPress={() => TwoButtonAlert()}
        />
        <FitnessTaskCard
          doctorName="Dr. Bhagwan koirala"
          routine="28 June 2022, 10:00 am"
          address="Sydney"
          onPress={() => TwoButtonAlert()}
        />
        <FitnessTaskCard
          doctorName="Morning Walk"
          routine="12 September, 12:00 am"
          address="Melbourne"
          onPress={() => TwoButtonAlert()}
        />
        <FitnessTaskCard
          doctorName="Morning Walk"
          routine="12 September, 3:00 pm"
          address="Canada"
          onPress={() => TwoButtonAlert()}
        />
        <View style={{marginBottom: 30}} />
      </ScrollView>
    </View>
  );
};

export default BookAppointment;
