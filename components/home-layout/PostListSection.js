// PostListSection.js
import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

const PostListSection = ({ posts }) => (
  <View style={styles.postsContainer}>
    <Text style={styles.sectionTitle}>All Posts</Text>
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.postItem}>
          <Image
            source={{ uri: `https://exotica-store-backend.vercel.app/api/${item.image}` }}
            style={styles.postImage}
          />
          <Text style={styles.postTitle}>{item.name}</Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  postItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    paddingBottom: 10,
  },
  postImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  postTitle: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default PostListSection;
