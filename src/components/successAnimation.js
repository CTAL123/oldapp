import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const SuccessAnimation = () => {
  const loading = useSelector(state => state.general.successAnimation);

  return (
    <Modal
      isVisible={loading}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      backdropOpacity={0.6}
      useNativeDriver={true}>
      <View style={styles.loading}>
        <LottieView
          source={require('../images/successAnimation.json')}
          autoPlay
          loop={false}
        />
      </View>
    </Modal>
  );
};

export default SuccessAnimation;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
