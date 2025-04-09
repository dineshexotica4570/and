import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          setCartItems(JSON.parse(cartData));
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cartItems.filter(item => item._id !== productId);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const updateQuantity = (productId, type) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === productId) {
        let updatedQuantity = item.quantity;
        if (type === 'increase') updatedQuantity += 1;
        if (type === 'decrease' && updatedQuantity > 1) updatedQuantity -= 1;
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + (parseFloat(item.price) * item.quantity || 0), 0)
      .toFixed(2); // Round to 2 decimal places
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.cartHeader}>Cart</Text>
      </View>

      <View style={styles.cartItemsContainer}>
        {cartItems.map((item) => (
          <View key={item._id} style={styles.cartItem}>
            <Image
              source={{ uri: `https://exotica-store-backend.vercel.app/api/${item.image}` }}
              style={styles.cartItemImage}
            />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={[styles.quantityButton, { backgroundColor: '#6200EE' }]}
                  onPress={() => updateQuantity(item._id, 'decrease')}
                >
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityDisplay}>{item.quantity}</Text>
                <TouchableOpacity
                  style={[styles.quantityButton, { backgroundColor: '#6200EE' }]}
                  onPress={() => updateQuantity(item._id, 'increase')}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Remove Button */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item._id)}
            >
              <Text style={styles.removeText}>❌</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total Items: {getTotalItems()}</Text>
        <Text style={styles.totalText}>Total Price: ${getTotalPrice()}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout', { cartItems })}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 5,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  cartHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  cartItemsContainer: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
    position: 'relative', // For absolute positioning inside
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#6200EE',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    padding: 2,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 20,
  },
  quantityDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 5,
    borderRadius: 15,
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#888',
  },
});

export default CartScreen;
