import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const HeroComponent = () => {
  const gradientColors = ['#FF8C00', '#FF4500', '#DC143C', '#B22222'];
  
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.line} />
        
        {Platform.OS === 'web' ? (
          // Web fallback without MaskedView
          <View style={styles.titleWrapper}>
            <Text style={[styles.titleText, styles.webGradientText]}>
              Discover Beautiful Wallpapers
            </Text>
          </View>
        ) : (
          // Native implementation with MaskedView
          <MaskedView 
            style={styles.maskedView}
            maskElement={
              <Text style={styles.titleText}>
                Discover Beautiful Wallpapers
              </Text>
            }
          >
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBackground}
            >
              <Text style={[styles.titleText, styles.hiddenText]}>
                Discover Beautiful Wallpapers
              </Text>
            </LinearGradient>
          </MaskedView>
        )}

        <Text style={styles.subText}>
          Discover curated collections of stunning wallpapers. Browse by category, 
          preview in full-screen, and set your favorites.
        </Text>
      </View>
    </View>
  );
};

export default HeroComponent;

const styles = StyleSheet.create({
  mainWrapper: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  contentWrapper: {
    position: 'relative',
    paddingLeft: 20,
  },
  line: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 4,
    height: '100%',
    borderRadius: 2,
  },
  maskedView: {
    marginBottom: 10,
  },
  titleWrapper: {
    marginBottom: 10,
  },
  gradientBackground: {
    flex: 1,
  },
  titleText: {
    fontFamily: Platform.select({
      ios: 'ClashDisplay',
      android: 'ClashDisplay',
      web: 'ClashDisplay',
    }),
    fontSize: Platform.select({
      ios: 24,
      android: 24,
      web: 60,
    }),
    fontWeight: '500',
    lineHeight: Platform.select({
      ios: 30,      // 1.25x the font size for mobile
      android: 30,  // 1.25x the font size for mobile
      web: 72,      // 1.2x the font size for web
    }),
    letterSpacing: 0,
    textAlign: 'left',
  },
  hiddenText: {
    opacity: 0,
  },
  webGradientText: {
    // CSS gradient for web
    ...(Platform.OS === 'web' && {
      backgroundImage: 'linear-gradient(100deg, #FBB03B, #EC0C43, #FBB03B, #EC0C43)',
      // @ts-ignore - web-specific properties
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    }),
  },
  subText: {
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins',
      web: 'Poppins',
    }),
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
    color: '#575757',
    marginTop: 10,
    paddingRight: 10,
  },
});