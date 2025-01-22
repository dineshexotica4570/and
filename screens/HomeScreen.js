// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../components/Header'; // Import your Header component
import SliderSection from '../components/home-layout/SliderSection'; // Import SliderSection
import PostListSection from '../components/home-layout/PostListSection'; // Import PostListSection
import ProductListSection from '../components/home-layout/ProductListSection'; // Import ProductListSection
import ProductCategory from '../components/home-layout/ProductCategory';
const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]); // State to hold products data
  
  useEffect(() => {
    axios
      .get('https://exotica-store-backend.vercel.app/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts', error);
      });

    axios
      .get('https://exotica-store-backend.vercel.app/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header title="Home" /> {/* Custom Header */}
      
      {/* Slider Section */}
      <SliderSection posts={posts} />

      {/* Product Category Section */}
      <ProductCategory />

      {/* Products Section */}
      <ProductListSection products={products} />

      {/* Posts List Section */}
      <PostListSection posts={posts} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
