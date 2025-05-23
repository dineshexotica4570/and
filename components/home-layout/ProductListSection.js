// ProductListSection.js
import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width } = Dimensions.get('window');

const ProductListSection = ({ products }) => {
  const navigation = useNavigation(); // Use the hook to access navigation

  const renderProductItem = (item) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item._id })} // Navigate to ProductDetail screen
    >
      <Image
        source={{ uri: `https://exotica-store-backend.vercel.app/api/${item.image}` }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.productsContainer}>
      <Text style={styles.sectionTitle}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => renderProductItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
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
  productItem: {
    width: width * 0.45,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  productName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
});

export default ProductListSection;
