import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/splash';
import SignUpForm from '../screens/signUpScreen';
import HomepageStack from './homePageRoute';

const AuthRoute = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignUpForm" component={SignUpForm} />
      <AuthStack.Screen name="HomepageStack" component={HomepageStack} />
    </AuthStack.Navigator>
  );
};

export default AuthRoute;
