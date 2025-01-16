import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostItem = ({ item }) => {
  return (
    <View style={styles.postContainer}>
      <Image
        source={{ uri: `https://exotica-store-backend.vercel.app/api/${item.image}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default PostItem;
