// ===== Explore.tsx =====
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Categories from './Categories';
import SelectedWallpaper from './selectedWallpaper';
import HeroComponent from './heroComponent';
import { useWallpaper } from '../utils/WallpaperContext';

interface ExploreProps {
  isBrowserScreen?: boolean; // 👈 Add this prop
}

const Explore: React.FC<ExploreProps> = ({ isBrowserScreen = false }) => {
  const { activeWallpaper, setActiveWallpaper } = useWallpaper();
  const [selectedWallpaper, setSelectedWallpaper] = useState<{
    imageUri: string;
    category: string;
    selectionName: string;
  } | null>(activeWallpaper);

  useEffect(() => {
    if (activeWallpaper) {
      setSelectedWallpaper(activeWallpaper);
    }
  }, [activeWallpaper]);

  const handleSelectWallpaper = (wallpaper: {
    imageUri: string;
    category: string;
    selectionName: string;
  }) => {
    setSelectedWallpaper(wallpaper);
    setActiveWallpaper(wallpaper);
  };

  const handleBack = () => {
    setSelectedWallpaper(null);
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Show this when no wallpaper is selected */}
        {!selectedWallpaper && (
          <>
            <HeroComponent />
            <Categories
              onSelectWallpaper={handleSelectWallpaper}
              isBrowserScreen={isBrowserScreen} // 👈 Pass the prop here
            />
          </>
        )}

        {/* Show this when wallpaper is selected */}
        {selectedWallpaper && (
          <>
            <SelectedWallpaper
              imageUri={selectedWallpaper.imageUri}
              category={selectedWallpaper.category}
              selectionName={selectedWallpaper.selectionName}
              onBack={handleBack}
            />
            <Categories
              onSelectWallpaper={handleSelectWallpaper}
              isBrowserScreen={isBrowserScreen} // 👈 Pass again for consistency
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  mainWrapper: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    height:"100%"
  },
});
