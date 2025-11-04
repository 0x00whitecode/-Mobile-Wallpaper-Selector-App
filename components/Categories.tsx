import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Dimensions, useWindowDimensions } from 'react-native';
import { cardData } from '../utils/data';
import CardComponent from './CardComponent';
import { Feather } from '@expo/vector-icons';

// Get screen width for list layout
const screenWidth = Dimensions.get('window').width;

interface CategoriesProps {
  onSelectWallpaper: (data: { imageUri: string; category: string; selectionName: string }) => void;
  isBrowserScreen?: boolean;
}

const Categories: React.FC<CategoriesProps> = ({ onSelectWallpaper, isBrowserScreen = false }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAll, setShowAll] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const displayedData = showAll ? cardData : cardData.slice(0, 6);
  const handleSeeAll = () => setShowAll(!showAll);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Categories</Text>

        <View style={styles.rightHeader}>
          {isBrowserScreen && (
            <View style={styles.viewModeToggle}>
              <TouchableOpacity
                style={[styles.iconButton, viewMode === 'grid' && styles.activeIcon]}
                onPress={() => setViewMode('grid')}
              >
                <Feather name="grid" size={26} color={viewMode === 'grid' ? '#000000' : '#FFA821'} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconButton, viewMode === 'list' && styles.activeIcon]}
                onPress={() => setViewMode('list')}
              >
                <Feather name="list" size={26} color={viewMode === 'list' ? '#000000' : '#FFA821'} />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>{showAll ? 'Show Less' : 'See All'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView>
        <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {displayedData.map((card, index) => {
            const shortDescription =
              card.description.split(' ').slice(0, 7).join(' ') + '...';

            if (viewMode === 'list') {
              // 🧩 List View Layout
              return (
                <TouchableOpacity
                  key={`${card.category}-${index}`}
                  style={[listStyles.cardContainer, isMobile && listStyles.cardContainerMobile]}
                  onPress={() =>
                    onSelectWallpaper({
                      imageUri: card.categoryImage,
                      category: card.category,
                      selectionName: `${card.category} Collection`,
                    })
                  }
                >
                  <Image source={{ uri: card.categoryImage }} style={[listStyles.imageStyle, isMobile && listStyles.imageStyleMobile]} />
                  <View style={listStyles.textContainer}>
                    <Text style={[listStyles.title, isMobile && listStyles.titleMobile]}>{card.category}</Text>
                    <Text style={[listStyles.subtitle, isMobile && listStyles.subtitleMobile]}>{shortDescription}</Text>
                    <View style={listStyles.tag}>
                      <Text style={listStyles.tagText}>{card.totalWallpapers} wallpapers</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }

            // 🧱 Grid View Layout
            return (
              <View
                key={`${card.category}-${index}`}
                style={[styles.gridItem, isMobile && styles.gridItemMobile]}
              >
                <CardComponent
                  categoryImage={{ uri: card.categoryImage }}
                  category={card.category}
                  totalWallpapers={card.totalWallpapers}
                  description={shortDescription}
                  buttonText="View Gallery"
                  onPressButton={() =>
                    onSelectWallpaper({
                      imageUri: card.categoryImage,
                      category: card.category,
                      selectionName: `${card.category} Collection`,
                    })
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

// ==========================================
// 💠 MAIN STYLES
// ==========================================
const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: '#000',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  iconButton: {
    padding: 6,
  },
  activeIcon: {
    
  },
  seeAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  seeAllText: {
    color: '#007BFF',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31%',
  },
  gridItemMobile: {
    width: '48%',
  },
  listContainer: {
    flexDirection: 'column',
  },
});

// ==========================================
// 💎 LIST VIEW STYLES (landscape card layout)
// ==========================================
const listStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    width: screenWidth - 20,
    height: 225.12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth:1,
    borderColor:"#adadad6c"
  },
  imageStyle: {
    width: 277.21,
    height: 185.12,
    borderRadius: 15,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
   tag: {
    backgroundColor: '#878787',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    opacity: 0.8,
  },
  tagText: {
    fontSize: 12,
    color: '#fff', // ✅ changed to white for better contrast
    fontWeight: '500',
  },
  // Mobile-specific styles
  cardContainerMobile: {
    height: 180,
    paddingHorizontal: 10,
  },
  imageStyleMobile: {
    width: 150,
    height: 120,
  },
  titleMobile: {
    fontSize: 18,
  },
  subtitleMobile: {
    fontSize: 12,
  },
});
