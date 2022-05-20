import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';

import {useDispatch, useSelector} from 'react-redux';

const FitnessTaskCard = props => {
  return (
    <View
      style={{
        backgroundColor: '#d1e4f9',
        borderRadius: 20,
        marginHorizontal: 30,
        marginTop: 30,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          color: '#5396e3',
          marginLeft: 20,
          marginTop: 25,
        }}>
        {props.exerciseName}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
          marginTop: 10,
        }}>
        <FIcon style={{fontSize: 16, color: '#8bb8ff'}} name="clock" />

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
        <FIcon style={{fontSize: 16, color: '#8bb8ff'}} name="bell" />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'gray',
            marginLeft: 5,
          }}>
          {props.time}
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
    </View>
  );
};
const Fitness = () => {
  const userInfo = useSelector(state => state.general.userInfo);
  console.log('object', userInfo);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          backgroundColor: '#5396e3',
        }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '400',
            color: 'white',
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          Fitness
        </Text>
        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '400',
              color: 'gray',
              margin: 30,
              marginBottom: -10,
            }}>
            Tasks (3)
          </Text>
          <FitnessTaskCard
            exerciseName="Morning Walk"
            routine="Everyday - 7:00 am"
            time="15 min before"
          />
          <FitnessTaskCard
            exerciseName="Morning Walk"
            routine="Everyday - 7:00 am"
            time="15 min before"
          />
          <FitnessTaskCard
            exerciseName="Morning Walk"
            routine="Everyday - 7:00 am"
            time="15 min before"
          />
        </View>
      </View>
    </View>
  );
};

export default Fitness;
