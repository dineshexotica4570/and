import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Header = ({ title }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-width * 0.75))[0]; // Sidebar starts off-screen
  const navigation = useNavigation();

  // Toggle sidebar animation
  const toggleSidebar = () => {
    if (isSidebarOpen) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsSidebarOpen(false));
    } else {
      setIsSidebarOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Navigate to screen and close the sidebar
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    toggleSidebar();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.menuTitle}>E Store</Text>
        {isSearching ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#ccc"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity onPress={() => setIsSearching(false)}>
              <Text style={styles.searchText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setIsSearching(true)}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Sidebar */}
      {isSidebarOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* Close button */}
        <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>❌</Text>
        </TouchableOpacity>
        <Text style={styles.sidebarTitle}>E Store</Text>
        <TouchableOpacity onPress={() => navigateToScreen('Home')}>
          <Text style={styles.sidebarItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Shop')}>
          <Text style={styles.sidebarItem}>All Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('About')}>
          <Text style={styles.sidebarItem}>About</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 24,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  menuTitle: {
    fontSize: 24,
    left: 10,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#000',
  },
  searchText: {
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75,
    height: height,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 15,
  },
  closeButtonText: {
    fontSize: 15,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 0,
  },
  sidebarItem: {
    fontSize: 16,
    marginBottom: 15,
    color: '#6200EE',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
  },
});

export default Header;
