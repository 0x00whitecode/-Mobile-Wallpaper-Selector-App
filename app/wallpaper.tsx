// WallpaperPreviewSection.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { useWallpaper } from '../utils/WallpaperContext';
import { loadFavorites, toggleFavorite, getFavoriteIds, Wallpaper as FavWallpaper } from '../utils/favoritesManager';

const { width } = Dimensions.get('window');

interface Wallpaper {
  id: number;
  title: string;
  image: string;
  tag: string;
  description?: string;
}

interface Tag {
  name: string;
  color?: string;
}

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

// Settings Modal Component
const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;
  const [displayMode, setDisplayMode] = useState<'Fit' | 'Fill' | 'Stretch' | 'Tile'>('Fit');
  const [autoRotation, setAutoRotation] = useState(true);
  const [lockWallpaper, setLockWallpaper] = useState(true);
  const [syncDevices, setSyncDevices] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={settingsStyles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />

      <Animated.View
        style={[
          settingsStyles.modalContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <ScrollView style={settingsStyles.modalContent} showsVerticalScrollIndicator={false}>
          <View style={settingsStyles.header}>
            <View>
              <Text style={settingsStyles.headerTitle}>Wallpaper Setup</Text>
              <Text style={settingsStyles.headerSubtitle}>Configure your wallpaper settings and enable auto-rotation</Text>
            </View>
          </View>

          {/* Activate Wallpaper Card */}
          <View style={settingsStyles.activateCard}>
            <View style={settingsStyles.activateLeft}>
              <Text style={settingsStyles.activateTitle}>Activate Wallpaper</Text>
              <Text style={settingsStyles.activateSubtitle}>Set the selected wallpaper as your desktop background</Text>
            </View>
            <View style={settingsStyles.activatedBadge}>
              <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
              <Text style={settingsStyles.activatedText}>Activated</Text>
            </View>
          </View>

          {/* Display Mode Section */}
          <View style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitle}>Dsiplay mode</Text>
            
            <TouchableOpacity 
              style={settingsStyles.radioOption}
              onPress={() => setDisplayMode('Fit')}
            >
              <View style={settingsStyles.radioCircle}>
                {displayMode === 'Fit' && <View style={settingsStyles.radioSelected} />}
              </View>
              <View style={settingsStyles.radioContent}>
                <Text style={settingsStyles.radioLabel}>Fit</Text>
                <Text style={settingsStyles.radioDescription}>Scale to fit without cropping</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={settingsStyles.radioOption}
              onPress={() => setDisplayMode('Fill')}
            >
              <View style={settingsStyles.radioCircle}>
                {displayMode === 'Fill' && <View style={settingsStyles.radioSelected} />}
              </View>
              <View style={settingsStyles.radioContent}>
                <Text style={settingsStyles.radioLabel}>Fill</Text>
                <Text style={settingsStyles.radioDescription}>Scale to fill the entire screen</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={settingsStyles.radioOption}
              onPress={() => setDisplayMode('Stretch')}
            >
              <View style={settingsStyles.radioCircle}>
                {displayMode === 'Stretch' && <View style={settingsStyles.radioSelected} />}
              </View>
              <View style={settingsStyles.radioContent}>
                <Text style={settingsStyles.radioLabel}>Stretch</Text>
                <Text style={settingsStyles.radioDescription}>Stretch to fill the screen</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={settingsStyles.radioOption}
              onPress={() => setDisplayMode('Tile')}
            >
              <View style={settingsStyles.radioCircle}>
                {displayMode === 'Tile' && <View style={settingsStyles.radioSelected} />}
              </View>
              <View style={settingsStyles.radioContent}>
                <Text style={settingsStyles.radioLabel}>Tile</Text>
                <Text style={settingsStyles.radioDescription}>Repeat the image to fill the screen</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Auto Rotation Card */}
          <View style={settingsStyles.toggleCard}>
            <View style={settingsStyles.toggleLeft}>
              <Text style={settingsStyles.toggleTitle}>Auto - Rotation</Text>
              <Text style={settingsStyles.toggleSubtitle}>Automatically change your wallpaper at regular intervals</Text>
            </View>
            <TouchableOpacity 
              style={[settingsStyles.toggle, autoRotation && settingsStyles.toggleActive]}
              onPress={() => setAutoRotation(!autoRotation)}
            >
              <View style={[settingsStyles.toggleThumb, autoRotation && settingsStyles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>

          {/* Advanced Settings Section */}
          <View style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitle}>Advanced Settings</Text>
            
            <View style={settingsStyles.checkboxOption}>
              <TouchableOpacity 
                style={[settingsStyles.checkbox, lockWallpaper && settingsStyles.checkboxChecked]}
                onPress={() => setLockWallpaper(!lockWallpaper)}
              >
                {lockWallpaper && <Ionicons name="checkmark" size={16} color="#FFF" />}
              </TouchableOpacity>
              <View style={settingsStyles.checkboxContent}>
                <Text style={settingsStyles.checkboxLabel}>Lock Wallpaper</Text>
                <Text style={settingsStyles.checkboxDescription}>Prevent accidental changes</Text>
              </View>
            </View>

            <View style={settingsStyles.checkboxOption}>
              <TouchableOpacity 
                style={[settingsStyles.checkbox, syncDevices && settingsStyles.checkboxChecked]}
                onPress={() => setSyncDevices(!syncDevices)}
              >
                {syncDevices && <Ionicons name="checkmark" size={16} color="#FFF" />}
              </TouchableOpacity>
              <View style={settingsStyles.checkboxContent}>
                <Text style={settingsStyles.checkboxLabel}>Sync Across Devices</Text>
                <Text style={settingsStyles.checkboxDescription}>Keep wallpaper consistent on all devices</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={settingsStyles.actionButtons}>
            <TouchableOpacity style={settingsStyles.cancelButton} onPress={onClose}>
              <Text style={settingsStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={settingsStyles.saveButton} onPress={onClose}>
              <Text style={settingsStyles.saveButtonText}>Save Settings</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

// Main Component
const WallpaperPreviewSection = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width: screenWidth } = useWindowDimensions();
  const { category = 'Nature', totalWallpapers = 20 } = params;
  const { setActiveWallpaper } = useWallpaper();
  const isMobile = screenWidth < 768;

  const wallpapers: Wallpaper[] = Array.from(
    { length: parseInt(totalWallpapers as string) || 12 },
    (_, index) => ({
      id: index + 1,
      title: `${category} ${index + 1}`,
      image: `https://picsum.photos/300/500?random=${index}`,
      tag: category as string,
      description: `Discover the pure beauty of "${category} ${index + 1}" – your gateway to authentic, nature-inspired experiences.`,
    })
  );

  const tags: Tag[] = [
    { name: category as string },
    { name: 'Ambience' },
    { name: 'Flowers' },
  ];

  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper>(wallpapers[0]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    loadFavoritesData();
  }, []);

  // Load favorites from persistent storage (works on Windows, Android, iOS)
  const loadFavoritesData = async () => {
    try {
      const favoriteIds = await getFavoriteIds();
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const isFavorited = favorites.includes(selectedWallpaper.id);

  const handleToggleFavorite = async (id?: number) => {
    const targetId = id || selectedWallpaper.id;
    const wallpaper = wallpapers.find((w) => w.id === targetId);
    if (!wallpaper) return;

    try {
      await toggleFavorite(wallpaper);
      // Reload favorites to update UI
      await loadFavoritesData();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const handleWallpaperSelect = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleWallpaperPress = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    router.push({
      pathname: '/WallpaperDetails',
      params: { wallpaperId: wallpaper.id },
    });
  };

  const handleSetWallpaper = () => {
    console.log('Setting as wallpaper:', selectedWallpaper.image);
    // Update the active wallpaper in context
    setActiveWallpaper({
      imageUri: selectedWallpaper.image,
      category: selectedWallpaper.tag,
      selectionName: selectedWallpaper.title,
    });
  };

  const isLargeScreen = screenWidth >= 900;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color="#979797" />
          <Text style={styles.backText}>Back to Categories</Text>
        </TouchableOpacity>

        <View style={styles.viewToggleContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
        </View>

        <View
          style={[
            styles.contentWrapper,
            { flexDirection: isLargeScreen ? 'row' : 'column' },
          ]}
        >
          <View
            style={[
              styles.wallpaperSection,
              { width: isLargeScreen ? '50%' : '100%' },
            ]}
          >
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[
                  styles.viewButton,
                  viewMode === 'grid' && styles.viewButtonActive,
                ]}
                onPress={() => setViewMode('grid')}
              >
                <Ionicons
                  name="grid-outline"
                  size={26}
                  color={viewMode === 'grid' ? '#FBB03B' : '#414040'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.viewButton,
                  viewMode === 'list' && styles.viewButtonActive,
                ]}
                onPress={() => setViewMode('list')}
              >
                <Ionicons
                  name="list-outline"
                  size={26}
                  color={viewMode === 'list' ? '#FBB03B' : '#414040'}
                />
              </TouchableOpacity>
            </View>

            <View style={viewMode === 'grid' ? styles.wallpaperGrid : styles.wallpaperList}>
              {wallpapers.map((wallpaper) => {
                const cardWidth = isMobile ? (width - 60) / 2 : 200;
                return (
                  <TouchableOpacity
                    key={wallpaper.id}
                    style={[
                      viewMode === 'grid' ? { ...styles.wallpaperCard, width: cardWidth } : styles.wallpaperListItem,
                      selectedWallpaper.id === wallpaper.id && styles.selectedCard,
                    ]}
                    onPress={() => handleWallpaperSelect(wallpaper)}
                    onLongPress={() => handleWallpaperPress(wallpaper)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: wallpaper.image }}
                      style={viewMode === 'grid' ? styles.wallpaperImage : styles.wallpaperListImage}
                    />
                    <View style={styles.overlay}>
                      <Text style={[styles.wallpaperTitle, isMobile && styles.wallpaperTitleMobile]}>{wallpaper.title}</Text>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{wallpaper.tag}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.favoriteIconContainer}
                      onPress={() => handleToggleFavorite(wallpaper.id)}
                    >
                      <Ionicons
                        name={favorites.includes(wallpaper.id) ? 'heart' : 'heart-outline'}
                        size={24}
                        color={favorites.includes(wallpaper.id) ? '#fbb03b' : '#fff'}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View
            style={[
              styles.previewSection,
              { width: isLargeScreen ? '50%' : '100%' },
              isMobile && styles.previewSectionMobile,
            ]}
          >
            <View style={[styles.previewContainer, isMobile && styles.previewContainerMobile]}>
              <View style={[styles.previewLeft, isMobile && styles.previewLeftMobile]}>
                <Text style={[styles.previewHeading, isMobile && styles.previewHeadingMobile]}>Preview</Text>

                <View style={styles.infoSection}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.value}>{selectedWallpaper.title}</Text>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.label}>Tags</Text>
                  <View style={styles.tagsContainer}>
                    {tags.map((tag, i) => (
                      <View key={i} style={styles.tagBadge}>
                        <Text style={styles.tagText}>{tag.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.label}>Description</Text>
                  <Text style={styles.description}>
                    {selectedWallpaper.description || 'No description available.'}
                  </Text>
                </View>

                <View style={styles.actionIconsContainer}>
                  <TouchableOpacity style={styles.actionIcon}>
                    <Ionicons name="share-outline" size={25} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionIcon}>
                    <Ionicons name="brush-outline" size={25} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionIcon}
                    onPress={() => setSettingsVisible(true)}
                  >
                    <Ionicons name="settings-outline" size={25} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>

              {!isMobile && (
                <View style={styles.previewRight}>
                  <View style={styles.cameraIndicator}>
                    <Svg width="73" height="21" viewBox="0 0 73 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Rect width="72.3551" height="20.8838" rx="10.4419" fill="black" />
                    </Svg>
                  </View>

                  <Svg width="259" height="525" viewBox="0 0 259 525" fill="none">
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M217.7 0C238.718 5.45791e-05 255.756 17.0383 255.756 38.056V127.83C255.756 128.382 256.204 128.83 256.756 128.83H257.036C257.588 128.83 258.036 129.278 258.036 129.83V184.518C258.036 185.07 257.588 185.518 257.036 185.518H256.756C256.204 185.518 255.756 185.965 255.756 186.518V486.939C255.756 507.956 238.718 524.995 217.7 524.995H40.3352C19.3176 524.995 2.27935 507.956 2.27913 486.939V196.493C2.27913 195.941 1.83141 195.493 1.27913 195.493H1C0.447715 195.493 0 195.045 0 194.493V161.913C0 161.361 0.447715 160.913 1 160.913H1.27913C1.83141 160.913 2.27913 160.466 2.27913 159.913V156.385C2.27913 155.832 1.83141 155.385 1.27913 155.385H1C0.447715 155.385 0 154.937 0 154.385V121.833C0 121.281 0.447715 120.833 1 120.833H1.27913C1.83141 120.833 2.27913 120.386 2.27913 119.833V111.779C2.27913 111.227 1.83141 110.779 1.27913 110.779H1C0.447715 110.779 0 110.331 0 109.779V91.6675C0 91.1152 0.447715 90.6675 1 90.6675H1.27913C1.83141 90.6675 2.27913 90.2198 2.27913 89.6675V38.056C2.27913 17.0383 19.3174 8.96716e-07 40.3352 0H217.7Z"
                      fill="#D9D9D9"
                    />
                  </Svg>

                  <Image
                    source={{ uri: selectedWallpaper.image }}
                    style={styles.previewImageInsideFrame}
                    resizeMode="cover"
                  />

                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => handleWallpaperPress(selectedWallpaper)}
                  >
                    <Ionicons name="expand-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[
                  styles.button,
                  isFavorited ? styles.favoriteActive : styles.favoriteInactive,
                ]}
                onPress={() => handleToggleFavorite()}
              >
                <Ionicons
                  name={isFavorited ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isFavorited ? '#fff' : '#000'}
                />
                <Text
                  style={[
                    styles.buttonText,
                    { color: isFavorited ? '#fff' : '#000' },
                  ]}
                >
                  {isFavorited ? 'Remove from Favorites' : 'Save to Favorites'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleSetWallpaper}
              >
                <Ionicons name="image-outline" size={20} color="#fff" />
                <Text style={[styles.buttonText, { color: '#fff' }]}>
                  Set as Wallpaper
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <SettingsModal 
        visible={settingsVisible} 
        onClose={() => setSettingsVisible(false)} 
      />
    </View>
  );
};

export default WallpaperPreviewSection;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  backButton: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingBottom: 10 },
  backText: { color: '#979797', fontSize: 18, marginLeft: 8 },
  viewToggleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  categoryTitle: { fontSize: 24, color: '#000' },
  viewToggle: { flexDirection: 'row', borderRadius: 8, padding: 2, justifyContent: 'flex-end' },
  viewButton: { padding: 8, borderRadius: 6 },
  viewButtonActive: { backgroundColor: '#fff' },
  contentWrapper: { flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 40, gap: 90 },
  wallpaperSection: { flex: 1 },
  previewSection: { flex: 1, padding: 30, paddingLeft: 40, paddingRight: 40, backgroundColor: '#FFFFFF' },
  wallpaperGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 },
  wallpaperList: { paddingHorizontal: 0 },
  wallpaperCard: { width: 200, height: 300, borderRadius: 12, overflow: 'hidden', position: 'relative', borderWidth: 3, borderColor: 'transparent' },
  wallpaperListItem: { width: '100%', height: 400, borderRadius: 12, overflow: 'hidden', marginBottom: 15, position: 'relative', borderWidth: 3, borderColor: 'transparent' },
  selectedCard: { borderColor: '#fbb03b' },
  wallpaperImage: { width: '100%', height: '100%' },
  wallpaperListImage: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 0, left: 0, padding: 10, width: '100%' },
  wallpaperTitle: { color: '#fff', fontSize: 24 },
  badge: { backgroundColor: 'rgba(255,255,255,0.25)', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 24, width: 80 },
  badgeText: { color: '#fff', fontSize: 10 },
  favoriteIconContainer: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: 6 },
  previewContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 },
  previewLeft: { flex: 1, marginRight: 20 },
  previewHeading: { fontSize: 32, color: '#070707d7', marginBottom: 40, fontFamily: 'Poppins', fontWeight: '700' },
  infoSection: { marginBottom: 16 },
  label: { color: '#999', fontSize: 13, marginBottom: 6, fontFamily: 'Poppins' },
  value: { color: '#000', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagBadge: { backgroundColor: '#f5f5f5', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 14 },
  tagText: { color: '#333', fontSize: 12 },
  description: { color: '#666', fontSize: 12, lineHeight: 18 },
  actionIconsContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  actionIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  previewRight: { width: 259, height: 525, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  previewImageInsideFrame: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 240,
    height: 515,
    borderRadius: 38,
    overflow: 'hidden',
    transform: [{ translateX: -120 }, { translateY: -260 }],
    borderWidth: 3.31,
    borderColor: '#000'
  },
  expandButton: { position: 'absolute', bottom: 15, right: 15, backgroundColor: 'rgba(255,3,3,0.5)', borderRadius: 20, padding: 8 },
  cameraIndicator: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: [{ translateX: -36.5 }],
    zIndex: 10,
  },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginVertical: 30, paddingHorizontal: 20 },
  button: { flexDirection: 'row', alignItems: 'center', borderRadius: 24, paddingVertical: 14, paddingHorizontal: 24, gap: 8, flex: 1, justifyContent: 'center', width: 200 },
  favoriteActive: { backgroundColor: '#fbb03b' },
  favoriteInactive: { backgroundColor: '#fff', borderColor: '#e0e0e0', borderWidth: 1.5 },
  primaryButton: { backgroundColor: '#fbb03b' },
  buttonText: { fontSize: 14 },
  // Mobile-specific styles
  wallpaperTitleMobile: { fontSize: 16 },
  previewSectionMobile: { padding: 15 },
  previewContainerMobile: { flexDirection: 'column' },
  previewLeftMobile: { marginRight: 0, marginBottom: 20 },
  previewHeadingMobile: { fontSize: 24, marginBottom: 20 },
});

const settingsStyles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.45,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalContent: {
    flex: 1,
    padding: 44,
    paddingTop: 48,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins',
    lineHeight: 20,
  },
  activateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  activateLeft: {
    flex: 1,
    marginRight: 16,
  },
  activateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  activateSubtitle: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },
  activatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  activatedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22C55E',
    fontFamily: 'Poppins',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FBB03B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FBB03B',
  },
  radioContent: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  radioDescription: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },
  toggleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  toggleLeft: {
    flex: 1,
    marginRight: 16,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  toggleSubtitle: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E5E5',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#FBB03B',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FBB03B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#FBB03B',
  },
  checkboxContent: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  checkboxDescription: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    paddingVertical: 16,
    borderRadius: 100,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    fontFamily: 'Poppins',
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBB03B',
    paddingVertical: 16,
    borderRadius: 100,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
    fontFamily: 'Poppins',
  },
});