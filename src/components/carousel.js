import React from 'react';
import {useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import MaterialIconsI from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('screen').width;

const Carousel = props => {
  const [index, setIndex] = useState(0);
  const Circle = <MaterialIconsI name="circle" size={8} color="#E2E2E2" />;
  const CircleSelected = (
    <MaterialIconsI name="circle" size={8} color="#C29200" />
  );

  const handleScroll = event => {
    if (event.nativeEvent.contentOffset.x % width === 0) {
      setIndex(event.nativeEvent.contentOffset.x / width);
    }
  };

  return (
    <View style={[styles.root, props.style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={0}
        pagingEnabled
        onScroll={handleScroll}>
        {props.slides.map((slide, i) => {
          return (
            <React.Fragment key={`carouselSlide${i}`}>{slide}</React.Fragment>
          );
        })}
      </ScrollView>

      <View style={styles.indexContainer}>
        {props.slides.map((slide, i) => {
          if (i === index) {
            return (
              <React.Fragment key={`carouselIndicator${i}`}>
                {CircleSelected}
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={`carouselIndicator${i}`}>
                {Circle}
              </React.Fragment>
            );
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -6,
  },
  indexContainer: {
    flexDirection: 'row',
    width: 0.15 * width,
    justifyContent: 'space-evenly',
  },
});

export default Carousel;
