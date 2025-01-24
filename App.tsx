import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductsScreen from './screens/ProductsScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session on app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setIsLoggedIn(true);  // User is logged in
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  // Handle login
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
        await AsyncStorage.setItem('user', JSON.stringify({ email, password }));  // Store user in AsyncStorage
        setIsLoggedIn(true);  // Set logged in status
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed. Please try again later.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');  // Remove user from AsyncStorage
      setIsLoggedIn(false);  // Reset logged-in status
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Home">
            {(props) => <HomeScreen {...props} />}
          </Tab.Screen>
          <Tab.Screen name="About">
            {(props) => <AboutScreen {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Logout"
            component={() => {
              handleLogout();
              return null; // Just logout and navigate back to LoginScreen
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
