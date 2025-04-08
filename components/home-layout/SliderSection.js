// SliderSection.js
import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SliderSection = ({ posts }) => {
  const renderSliderItem = (item) => (
    <View style={styles.sliderItem}>
      <Image
        source={{ uri: `https://exotica-store-backend.vercel.app/api/${item.image}` }}
        style={styles.sliderImage}
      />
      <Text style={styles.sliderTitle}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.sliderContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {posts.slice(0, 4).map((item) => (
          <View key={item._id}>{renderSliderItem(item)}</View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sliderItem: {
    width: width * 0.8,
    marginRight: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sliderImage: {
    width: '100%',
    height: 150,
  },
  sliderTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SliderSection;
