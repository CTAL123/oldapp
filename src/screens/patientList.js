import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

import profileImage from '../images/profile.png';
import {loading, success} from '../actions/generalActions';
import navigationService from '../route/navigationService';
import {useDispatch, useSelector} from 'react-redux';

const PatientList = props => {
  const patientList = props?.route?.params;
  const dispatch = useDispatch();

  const FitnessTaskCard = props => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#d1e4f9',
          borderRadius: 20,
          marginHorizontal: 20,
          marginTop: 30,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 10,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
        activeOpacity={0.75}
        onPress={async () => {
          dispatch(loading());
          await firestore()
            .collection('Users')
            .doc(props.exerciseName)
            .get()
            .then(user => {
              dispatch(success());
              navigationService.navigate('UpdateProfile', {...user?._data});
            })
            .catch(error => {
              // console.log(error);
              dispatch(success());
            });
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.avatarUrlShadow]}>
            <Image style={styles.avatarUrl} source={profileImage} />
          </View>
          <Text
            style={{
              fontSize: 21,
              fontWeight: '500',
              color: '#2d2b55',
              marginLeft: 10,
            }}>
            {props.exerciseName}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 15,
            }}>
            <FIcon style={{fontSize: 16, color: 'white'}} name="trending-up" />

            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'white',
                marginLeft: 5,
              }}>
              Progress
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          backgroundColor: '#2d2b55',
          marginBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          <Icon
            name="md-arrow-back-circle-outline"
            style={{
              color: 'white',
              fontSize: 36,
              marginLeft: 20,
            }}
            onPress={() => {
              navigationService.back();
            }}
          />
          <Text
            style={{
              fontSize: 26,
              fontWeight: '400',
              color: 'white',
              alignSelf: 'center',
            }}>
            Patient List
          </Text>

          <View />
        </View>
        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: 'white',
            paddingBottom: 200,
          }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '400',
              color: 'gray',
              margin: 30,
              marginBottom: -10,
            }}>
            Patients ({patientList?.data.length})
          </Text>
          <ScrollView
            style={{marginBottom: 65, marginTop: 10}}
            showsVerticalScrollIndicator={false}>
            {patientList?.data?.map((patient, index) => {
              return (
                <FitnessTaskCard
                  exerciseName={patient}
                  routine="Everyday - 7:00 am"
                  time="15 min before"
                  key={index}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarUrlShadow: {
    borderRadius: 100,
  },
  avatarUrl: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});
export default PatientList;
