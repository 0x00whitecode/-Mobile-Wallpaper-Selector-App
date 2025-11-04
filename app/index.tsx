import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Explore from "../components/explore";

export default function Index() {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Explore />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8", // optional background color
  },
  contentContainer: {
    paddingBottom: 40, // adds space at bottom for smooth scrolling
  },
});
