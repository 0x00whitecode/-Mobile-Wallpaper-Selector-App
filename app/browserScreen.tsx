import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Explore from '../components/explore';

const BrowserScreen = () => {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Explore isBrowserScreen />
    </ScrollView>
  );
};

export default BrowserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8", 
  },
  contentContainer: {
    paddingBottom: 40, 
  },
});