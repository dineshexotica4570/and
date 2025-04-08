import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'; // Import your Header component
import ProductListSection from '../components/home-layout/ProductListSection'; // Import ProductListSection
import axios from 'axios';
const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
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
    <View style={styles.container}>
      <Header /> {/* Add the custom Header component here */}
      <ProductListSection products={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default ProductsScreen;
