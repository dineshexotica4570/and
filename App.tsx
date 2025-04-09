import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailScreen from './screens/ProductDetailScreen'; // Import ProductDetailScreen
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartScreen from './screens/CartScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://exotica-store-backend.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.userId) {
        await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
        setIsLoggedIn(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed. Please try again later.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
      headerShown: false, // Hide header for the tab screens
      }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            {/* Add BottomTabNavigator as a Screen inside the Stack */}
            <Stack.Screen name="HomeTabs">
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false, 
                  }}
                >
                  {/* Tab Screens */}
                  <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                  />

                  {/* Shop tab that includes Stack navigation */}
                  <Tab.Screen
                    name="Shop"
                  >
                    {() => (
                      <Stack.Navigator
                        screenOptions={{
                          headerShown: false, 
                        }}
                      >
                        <Stack.Screen name="Products" component={ProductsScreen} />
                        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                        <Stack.Screen name="Cart" component={CartScreen} />
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  {/* Logout Tab */}
                  <Tab.Screen
                    name="Logout"
                    component={() => {
                      handleLogout();
                      return null; // Just logout and navigate back to LoginScreen
                    }}
                  />
                </Tab.Navigator>
              )}
            </Stack.Screen>

            {/* This is where we add ProductDetailScreen as a global screen */}
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ headerShown: false }} 
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ headerShown: false }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
