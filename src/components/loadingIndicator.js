import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

import {SkypeIndicator} from 'react-native-indicators';

const LoadingIndicator = () => {
  const loading = useSelector(state => state.general.loading);

  return (
    <Modal
      isVisible={loading}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      backdropOpacity={0.6}
      useNativeDriver={true}>
      <View style={styles.loading}>
        <SkypeIndicator color="yellow" size={50} />
      </View>
    </Modal>
  );
};

export default LoadingIndicator;

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
