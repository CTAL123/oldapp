import React from 'react';
import {Dimensions} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from '../screens/homePage';
import Profile from '../screens/userProfile';
import Fitness from '../screens/fitness';
import Appointment from '../screens/appointment';
import BookAppointment from '../screens/bookAppointment';
import UpdateProfile from '../screens/updateProfile';
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const windowWidth = Dimensions.get('window').width;

const TabStack = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: 'white',
        height: 70,
        borderTopWidth: 1,
      },
      tabBarHideOnKeyboard: true,
    }}>
    <Tab.Screen
      name="Dashboard"
      component={HomePage}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon
            style={{
              color: focused ? '#1a295e' : '#9D9D9D',
              fontSize: windowWidth / 12,
            }}
            name="home"
          />
        ),
        headerShown: false,
        tabBarLabel: '',
      }}
    />

    <Tab.Screen
      name="fitness"
      component={Fitness}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon
            style={{
              color: focused ? '#1a295e' : '#9D9D9D',
              fontSize: windowWidth / 10,
            }}
            name="md-fitness-sharp"
          />
        ),
        headerShown: false,
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="appointment"
      component={Appointment}
      options={{
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons
            name="doctor"
            style={{
              color: focused ? '#1a295e' : '#9D9D9D',
              fontSize: windowWidth / 10,
            }}
          />
        ),
        headerShown: false,
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Account"
      component={Profile}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon
            style={{
              color: focused ? '#1a295e' : '#9D9D9D',
              fontSize: windowWidth / 12,
            }}
            name="person"
          />
        ),
        headerShown: false,
        tabBarLabel: '',
      }}
    />
  </Tab.Navigator>
);

const HomepageStack = () => (
  <MainStack.Navigator
    initialRouteName="TabStack"
    screenOptions={{
      headerShown: false,
    }}>
    <MainStack.Screen name="TabStack" component={TabStack} />
    <MainStack.Screen name="BookAppointment" component={BookAppointment} />
    <MainStack.Screen name="UpdateProfile" component={UpdateProfile} />
    {/* <MainStack.Screen name="TabStack" component={TabStack} /> */}
  </MainStack.Navigator>
);

export default HomepageStack;
