import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

interface CategoryCardProps {
  categoryImage: ImageSourcePropType;
  category: string;
  totalWallpapers: number;
  description: string;
  buttonText?: string;
  onPressButton?: () => void; // used for selecting wallpapers
  isListView?: boolean;
}

const CardComponent: React.FC<CategoryCardProps> = ({
  categoryImage,
  category,
  totalWallpapers,
  description,
  buttonText,
  onPressButton,
  isListView = false,
}) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleCardPress = () => {
    if (onPressButton) {
      // call parent handler (Explore via Categories)
      onPressButton();
    } else {
      // default behavior (used standalone)
      router.push({
        pathname: '/wallpaper',
        params: {
          category: category,
          totalWallpapers: totalWallpapers.toString(),
        },
      });
    }
  };

  const handleButtonPress = () => {
    // Navigate to wallpaper details/browser screen
    router.push({
      pathname: '/wallpaper',
      params: {
        category: category,
        totalWallpapers: totalWallpapers.toString(),
      },
    });
  };

  if (isListView) {
    return (
      <TouchableOpacity style={listStyles.card} activeOpacity={0.9} onPress={handleCardPress}>
        <Image source={categoryImage} style={listStyles.image} resizeMode="cover" />
        <View style={listStyles.content}>
          <Text style={listStyles.title}>{category}</Text>
          <Text style={listStyles.description} numberOfLines={2}>
            {description}
          </Text>
          <View style={listStyles.wallpaperCount}>
            <Text style={listStyles.countText}>{totalWallpapers} wallpapers</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.card, isMobile && styles.cardMobile]} activeOpacity={0.9} onPress={handleCardPress}>
      <ImageBackground
        source={categoryImage}
        style={[styles.imageBackground, isMobile && styles.imageBackgroundMobile]}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>{category}</Text>
          <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>{description}</Text>
          {buttonText && (
            <TouchableOpacity style={[styles.button, isMobile && styles.buttonMobile]} onPress={handleButtonPress}>
              <Text style={[styles.buttonText, isMobile && styles.buttonTextMobile]}>{totalWallpapers} Wallpapers</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// List view styles
const listStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    height: 225.12,
    marginBottom: 12,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 277.21,
    height: 185.12,
    borderRadius: 16.56,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#000000',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666666',
    fontFamily: 'Poppins',
    flex: 1,
    lineHeight: 18,
    marginBottom: 5,
  },
  wallpaperCount: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  countText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins',
  },
});

// Grid view styles
const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 26,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 290.71,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  // Mobile-specific styles
  cardMobile: {
    height: 200,
  },
  imageBackgroundMobile: {
    height: 200,
  },
  titleMobile: {
    fontSize: 18,
  },
  subtitleMobile: {
    fontSize: 12,
    marginBottom: 10,
  },
  buttonMobile: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonTextMobile: {
    fontSize: 12,
  },
});

export default CardComponent;