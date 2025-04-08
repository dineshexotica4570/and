import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header'; // Import your Header component

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://exotica-store-backend.vercel.app/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: 'red' }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text size={28} color="#6200EE">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text size={28} color="#6200EE">Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <Image
        source={{ uri: `https://exotica-store-backend.vercel.app/api/${product.image}` }}
        style={styles.productImage}
      />

      {/* Details Section */}
      <View style={styles.detailsSection}>
        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>★★★★★</Text>
          <Text style={styles.ratingText}>(4.9)</Text>
        </View>

        {/* Colors */}
        <View style={styles.colorPicker}>
          {['#000', '#aaa', '#fff', '#fcbcd9', '#f4edea'].map((clr, i) => (
            <View
              key={i}
              style={[styles.colorDot, { backgroundColor: clr }]}
            />
          ))}
        </View>

        {/* Price */}
        <Text style={styles.price}>${product.price}</Text>

        {/* Sizes */}
        <Text style={styles.label}>Select Size</Text>
        <View style={styles.sizePicker}>
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <View key={size} style={styles.sizeBox}>
              <Text style={styles.sizeText}>{size}</Text>
            </View>
          ))}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 40,
  },

  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  detailsSection: {
    marginTop: -30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },

  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stars: {
    color: '#FFA800',
    fontSize: 18,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },

  colorPicker: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  price: {
    fontSize: 26,
    fontWeight: '700',
    color: '#6200EE',
    marginVertical: 15,
  },

  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },

  sizePicker: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },

  sizeBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  sizeText: {
    fontSize: 14,
    fontWeight: '500',
  },

  addToCartBtn: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },

  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
