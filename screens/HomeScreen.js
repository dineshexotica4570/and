import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../components/Header'; // Import your Header component
import PostItem from '../components/PostItem'; // Import your PostItem component

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://exotica-store-backend.vercel.app/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Home" /> {/* Add the custom Header component here */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PostItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
