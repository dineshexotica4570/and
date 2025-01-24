import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'; // Import your Header component

const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      <Header /> {/* Add the custom Header component here */}
      <View style={styles.content}>
        <Text style={styles.text}>This is the Products screen.</Text>
      </View>
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
