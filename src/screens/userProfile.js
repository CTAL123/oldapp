import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import FIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import profileImage from '../images/profile.png';
import navigationService from '../route/navigationService';
import AlertModal from '../components/twoButtonAlert';

const LabeledIconComponent = props => {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 50,
          paddingBottom: 20,
          paddingTop: 10,
        }}
        activeOpacity={0.75}
        onPress={props?.onPress}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        <FIcon style={{fontSize: 24, color: 'black'}} name={props.iconName} />
      </TouchableOpacity>
      <View
        style={{
          marginBottom: 10,
          height: 1,
          backgroundColor: 'rgba(73, 74, 126,0.3)',
          marginHorizontal: 40,
        }}
      />
    </>
  );
};

const Profile = () => {
  const userInfo = useSelector(state => state.general.userInfo);

  const [alert, setAlert] = useState(false);
  return (
    <View style={styles.root}>
      <AlertModal
        isVisible={alert}
        body="Are you sure?"
        but1="Logout"
        but2="Cancel"
        but1Action={() => {
          setAlert(false);
          AsyncStorage.clear();
          setTimeout(() => {
            navigationService.navigateReset('Splash');
          }, 300);
        }}
        but2Action={() => {
          setAlert(false);
        }}
      />
      <View style={styles.userProfileIconContainer}>
        <View style={[styles.avatarUrlShadow, {marginBottom: 15}]}>
          <Image style={styles.avatarUrl} source={profileImage} />
        </View>
        <Text style={styles.nameStyle}>{userInfo?.name}</Text>
      </View>
      <LabeledIconComponent title="user profile" iconName="key" />
      <LabeledIconComponent title="help center" iconName="alert-octagon" />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 40,
          backgroundColor: '#FF6A81',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 20,
          flexDirection: 'row',
        }}
        activeOpacity={0.75}
        onPress={() => {
          setAlert(true);
        }}>
        <Text style={[styles.titleStyle, {color: 'white'}]}>Logout</Text>
        <FIcon
          style={{
            fontSize: 20,
            color: 'white',
            marginLeft: 20,
          }}
          name="log-out"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  avatarUrlShadow: {
    borderRadius: 100,
  },
  avatarUrl: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  userProfileIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  nameStyle: {
    fontSize: 24,
    color: '#FF6A81',
    fontFamily: 'NotoSans-Regular',
    textTransform: 'capitalize',
  },
  titleStyle: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'NotoSans-Regular',
    textTransform: 'capitalize',
  },
});
export default Profile;
