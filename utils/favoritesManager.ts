import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

// File to store favorites data (works on Windows, Android, iOS)
export const FAVORITES_FILE = `${FileSystem.documentDirectory}favorites.json`;

export interface Wallpaper {
  id: number;
  title: string;
  image: string;
  tag: string;
  description?: string;
}

/**
 * Load favorites from persistent storage
 * Works on Windows (.exe), Android (.apk), iOS, and Web
 */
export const loadFavorites = async (): Promise<Wallpaper[]> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(FAVORITES_FILE);
    if (fileInfo.exists) {
      const data = await FileSystem.readAsStringAsync(FAVORITES_FILE);
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

/**
 * Save favorites to persistent storage
 * Works on Windows (.exe), Android (.apk), iOS, and Web
 */
export const saveFavorites = async (favorites: Wallpaper[]): Promise<boolean> => {
  try {
    await FileSystem.writeAsStringAsync(
      FAVORITES_FILE,
      JSON.stringify(favorites)
    );
    return true;
  } catch (error) {
    console.error('Error saving favorites:', error);
    return false;
  }
};

/**
 * Add a wallpaper to favorites
 */
export const addToFavorites = async (wallpaper: Wallpaper): Promise<boolean> => {
  try {
    const favorites = await loadFavorites();
    
    // Check if already exists
    if (favorites.some((f) => f.id === wallpaper.id)) {
      Alert.alert('Already Added', 'This wallpaper is already in your favorites');
      return false;
    }

    favorites.push(wallpaper);
    const success = await saveFavorites(favorites);
    
    if (success) {
      Alert.alert('Added', 'Wallpaper added to favorites');
    }
    
    return success;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    Alert.alert('Error', 'Failed to add wallpaper to favorites');
    return false;
  }
};

/**
 * Remove a wallpaper from favorites
 */
export const removeFromFavorites = async (wallpaperId: number): Promise<boolean> => {
  try {
    const favorites = await loadFavorites();
    const updatedFavorites = favorites.filter((f) => f.id !== wallpaperId);
    
    const success = await saveFavorites(updatedFavorites);
    
    if (success) {
      Alert.alert('Removed', 'Wallpaper removed from favorites');
    }
    
    return success;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    Alert.alert('Error', 'Failed to remove wallpaper from favorites');
    return false;
  }
};

/**
 * Toggle favorite status of a wallpaper
 */
export const toggleFavorite = async (wallpaper: Wallpaper): Promise<boolean> => {
  try {
    const favorites = await loadFavorites();
    const isFavorited = favorites.some((f) => f.id === wallpaper.id);
    
    if (isFavorited) {
      return await removeFromFavorites(wallpaper.id);
    } else {
      return await addToFavorites(wallpaper);
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    Alert.alert('Error', 'Failed to update favorites');
    return false;
  }
};

/**
 * Check if a wallpaper is favorited
 */
export const isFavorited = async (wallpaperId: number): Promise<boolean> => {
  try {
    const favorites = await loadFavorites();
    return favorites.some((f) => f.id === wallpaperId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

/**
 * Get favorite IDs only (for quick checks)
 */
export const getFavoriteIds = async (): Promise<number[]> => {
  try {
    const favorites = await loadFavorites();
    return favorites.map((f) => f.id);
  } catch (error) {
    console.error('Error getting favorite IDs:', error);
    return [];
  }
};

