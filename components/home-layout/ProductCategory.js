import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window'); // Screen width

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('https://exotica-store-backend.vercel.app/api/product_cat')
      .then((response) => {
        setCategories(response.data); // Store categories in state
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Render individual category item
  const renderCategoryItem = (item) => (
    <View style={styles.categoryItem}>
      <Image
        source={{ uri: `https://exotica-store-backend.vercel.app/api/${item.image}` }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Product Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        numColumns={2} // Display 2 categories per row
        columnWrapperStyle={styles.row} // Style for the row
        renderItem={({ item }) => renderCategoryItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  categoryItem: {
    width: width * 0.45, // Adjust width for category item
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductCategory;
