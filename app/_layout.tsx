import React, { useState, useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Slot } from 'expo-router';
import { WallpaperProvider } from '../utils/WallpaperContext';

// 🖥️ Custom Top Navigation Bar for Desktop
function TopNavigationBar() {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState('/');

  const menuItems = [
    {
      label: 'Home',
      icon: (isActive) => <Octicons name="home" size={24} color={isActive ? "#000" : "#666"} />,
      route: '/',
    },
    {
      label: 'Browse',
      icon: (isActive) => <MaterialCommunityIcons name="grid" size={24} color={isActive ? "#000" : "#666"} />,
      route: '/browserScreen',
    },
    {
      label: 'Favourites',
      icon: (isActive) => <MaterialIcons name="favorite-border" size={24} color={isActive ? "#000" : "#666"} />,
      route: '/favoriteScreen',
    },
    {
      label: 'Settings',
      icon: (isActive) => <Ionicons name="settings-outline" size={24} color={isActive ? "#000" : "#666"} />,
      route: '/settingsScreen',
    },
  ];

  return (
    <View style={styles.topNav}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Wallpaper Studio</Text>
      </View>

      <View style={styles.navLinks}>
        {menuItems.map((item, index) => {
          const isActive = activeRoute === item.route;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.navLinkContainer,
                isActive && styles.navLinkContainerActive
              ]}
              activeOpacity={0.7}
              onPress={() => {
                setActiveRoute(item.route);
                router.push(item.route);
              }}
            >
              {item.icon(isActive)}
              <Text style={[
                styles.navLinkText,
                isActive && styles.navLinkTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ClashDisplay: require("../assets/font/ClashDisplay_Complete/Fonts/TTF/ClashDisplay-Variable.ttf"),
        Poppins: require("../assets/font/Lemon,Plus_Jakarta_Sans,Poppins,Raleway/Poppins/Poppins-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const { width } = useWindowDimensions();
  const isDesktop = width >= 768 || Platform.OS === 'web';

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
           <Image
          source={require('../assets/loader.png')}
          style={styles.loader}
          resizeMode="contain"
        />
        
      </View>
    );
  }

  // 🖥️ Desktop View
  if (isDesktop) {
    return (
      <WallpaperProvider>
        <View style={{ flex: 1 }}>
          <TopNavigationBar />
          <Slot />
        </View>
      </WallpaperProvider>
    );
  }

  // 📱 Mobile Drawer View
  return (
    <WallpaperProvider>
      <Drawer
      screenOptions={{
        drawerPosition: 'right',
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000000',
        drawerActiveTintColor: '#000407ff',
        drawerLabelStyle: { fontSize: 16, marginLeft: -4, fontFamily: 'Poppins' },
        drawerItemStyle: styles.drawerItem,
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.headerText}>Wallpaper Studio</Text>
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="browserScreen"
        options={{
          drawerLabel: 'Browse',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="favoriteScreen"
        options={{
          drawerLabel: 'Favourites',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settingsScreen"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
    </WallpaperProvider>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginVertical: 2,
    gap: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  logo: {
    width: 20,
    height: 20,
  },
  loader:{
    width:50,
    height:50
  },
  headerText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
  // Desktop top navigation styles
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 47,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    height: 98,
    marginBottom: 30,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  navLinkContainerActive: {
    borderWidth: 2,
    borderColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    padding:10
  },
  navLinkText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#666666',
    marginLeft: 2,
  },
  navLinkTextActive: {
    color: '#000000',
    fontWeight: '500',
  },
});