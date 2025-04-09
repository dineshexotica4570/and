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
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Header from '../components/Header';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0); // To store cart item count
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch product details
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

    // Fetch cart item count
    const fetchCartItemCount = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        const cart = cartData ? JSON.parse(cartData) : [];
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(itemCount);
      } catch (err) {
        console.error('Error fetching cart item count:', err);
      }
    };

    fetchProduct();
    fetchCartItemCount();
  }, [productId]);

  // Add product to cart
  const addToCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      const cart = cartData ? JSON.parse(cartData) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
      fetchCartItemCount(); // Re-fetch the cart item count after adding the product
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

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
      <Header />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cartText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartText}>
            Cart ({cartItemCount}) {/* Display cart item count */}
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: `https://exotica-store-backend.vercel.app/api/${product.image}` }}
        style={styles.productImage}
      />

      <View style={styles.detailsSection}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>★★★★★</Text>
          <Text style={styles.ratingText}>(4.9)</Text>
        </View>
        <Text style={styles.price}>${product.price}</Text>
        <TouchableOpacity style={styles.addToCartBtn} onPress={addToCart}>
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

  cartText: {
    fontSize: 18,
    color: '#6200EE',
    fontWeight: '600',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
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

  price: {
    fontSize: 26,
    fontWeight: '700',
    color: '#6200EE',
    marginVertical: 15,
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
