import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

const AlertModal = props => {
  return (
    <Modal
      style={{marginHorizontal: 50}}
      isVisible={props.isVisible}
      animationIn={props.animationIn}
      animationOut={props.animationOut}
      animationInTiming={props.animationInTiming}
      animationOutTiming={props.animationOutTiming}
      backdropOpacity={0.6}
      useNativeDriver={true}>
      <View style={styles.loading}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: 'white',
            paddingVertical: 20,
            paddingBottom: 0,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontFamily: 'NotoSans-Regular',
                marginHorizontal: 20,
              }}>
              {props.body}
            </Text>
            {props.text && (
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontFamily: 'NotoSans-Bold',
                  marginHorizontal: 20,
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {props.text}
              </Text>
            )}
          </View>
          <View
            style={{
              marginVertical: 20,
              marginBottom: 0,
              height: 0.75,
              backgroundColor: 'rgba(73, 74, 126,0.75)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                props.but2Action();
              }}>
              <Text style={{fontSize: 18}}>{props.but2}</Text>
            </TouchableOpacity>
            <View
              style={{
                height: 50,
                width: 1,
                backgroundColor: '#797A83',
              }}
            />
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                props.but1Action();
              }}>
              <Text style={{fontSize: 18, color: '#8338EC'}}>{props.but1}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

AlertModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  but1: PropTypes.string.isRequired,
  but2: PropTypes.string.isRequired,
  animationIn: PropTypes.string.isRequired,
  animationOut: PropTypes.string.isRequired,
  but1Action: PropTypes.func.isRequired,
  but2Action: PropTypes.func.isRequired,
  animationInTiming: PropTypes.number,
  animationOutTiming: PropTypes.number,
};

AlertModal.defaultProps = {
  isVisible: false,
  title: '',
  but1: '',
  but2: '',
  animationIn: 'zoomIn',
  animationOut: 'zoomOut',
  but1Action: () => {},
  but2Action: () => {},
  animationInTiming: 300,
  animationOutTiming: 300,
};
export default AlertModal;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
});
