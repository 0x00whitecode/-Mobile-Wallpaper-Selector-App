import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from 'expo-router';

interface SelectedWallpaperProps {
  imageUri: string;
  category: string;
  selectionName: string;
  onBack?: () => void;
}

const SelectedWallpaper: React.FC<SelectedWallpaperProps> = ({
  imageUri,
  category,
  selectionName,
  onBack,
}) => {
  const { width } = useWindowDimensions();
  const gradientColors = ['#FF8C00', '#FF4500', '#DC143C'];
  const isMobile = width < 768;
  const router = useRouter();

  const handleShare = () => {
    Alert.alert('Share', 'Sharing functionality would be implemented here.');
  };

  const handleSettings = () => {
    // Navigate to wallpaper screen with the selected category
    router.push({
      pathname: '/wallpaper',
      params: {
        category: category,
        totalWallpapers: '20',
      },
    });
  };

  const handleViewGallery = () => {
    // Navigate to wallpaper screen to view full gallery
    router.push({
      pathname: '/wallpaper',
      params: {
        category: category,
        totalWallpapers: '20',
      },
    });
  };

  // Cross-platform gradient text renderer
  const GradientText = ({ text }: { text: string }) => {
    if (Platform.OS === 'web' || Platform.OS === 'windows' || Platform.OS === 'macos') {
      return (
        <Text
          style={{
            fontSize: 36,
            fontWeight: '600',
            textAlign: 'left',
            fontFamily: 'ClashDisplay',
            backgroundImage: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {text}
        </Text>
      );
    }

    return (
      <MaskedView maskElement={<Text style={styles.headerText}>{text}</Text>}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 32 }}
        />
      </MaskedView>
    );
  };

  return (
    <View style={[
      styles.cardContainer,
      { width: isMobile ? width - 20 : width - 50 },
      isMobile && styles.cardContainerMobile
    ]}>
      <View style={[styles.contentWrapper, isMobile && styles.contentWrapperMobile]}>
        {/* Left Side: Wallpaper Image */}
        <TouchableOpacity
          style={[styles.imageWrapper, isMobile && styles.imageWrapperMobile]}
          onPress={handleViewGallery}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
            onError={() => console.log('Error loading image URI')}
          />
          <View style={styles.imageOverlay}>
            <Feather name="eye" size={24} color="#fff" />
            <Text style={styles.viewGalleryText}>View Gallery</Text>
          </View>
        </TouchableOpacity>

        {/* Right Side: Text + Icons */}
        <View style={[styles.rightContainer, isMobile && styles.rightContainerMobile]}>
          <View style={styles.detailsContainer}>
            <GradientText text="Your Active Wallpaper" />

            <Text style={[styles.description, isMobile && styles.descriptionMobile]}>
              This wallpaper is currently set as your active background
            </Text>

            {/* Category & Selection Details */}
            <View style={styles.detailTextWrapper}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category -</Text>
                <Text style={styles.detailValue}>{category}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Selection -</Text>
                <Text style={styles.detailValue}>{selectionName}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons at the end */}
          <View style={[styles.buttonContainerRow, isMobile && styles.buttonContainerRowMobile]}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Feather name="upload" size={22} color="#808080" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
              <Feather name="settings" size={22} color="#808080" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 43,
    padding: 20,
    marginHorizontal: 10,
    marginTop: 20,
    alignSelf: 'center',
    minHeight: 250,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', // Center contents vertically
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center the whole row
    flex: 1,
  },
  imageWrapper: {
    width: 187.77,
    height: 280.33,
    borderRadius: 26,
    overflow: 'hidden',
    marginRight: 20,
    backgroundColor: '#EAEAEA',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  viewGalleryText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row', // text + icons side by side
    justifyContent: 'space-between', // put space between text and icons
    alignItems: 'center', // center everything vertically in the card
  },
  detailsContainer: {
    flex: 1,
    marginRight: 15,
  },
  headerText: {
    fontSize: 60,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 8,
  },
  description: {
    fontSize: 20,
    color: '#808080',
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 12,
  },
  detailTextWrapper: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    marginRight: 5,
    fontWeight: '400',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  buttonContainerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end', // push buttons to the far right
    gap: 12, // add spacing between icons
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // Mobile-specific styles
  cardContainerMobile: {
    padding: 15,
    minHeight: 200,
    marginHorizontal: 5,
  },
  contentWrapperMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  imageWrapperMobile: {
    width: '100%',
    height: 200,
    marginRight: 0,
    marginBottom: 15,
  },
  rightContainerMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  descriptionMobile: {
    fontSize: 14,
    lineHeight: 18,
  },
  buttonContainerRowMobile: {
    marginTop: 15,
    justifyContent: 'center',
  },
});

export default SelectedWallpaper;
