# Favorites Feature Documentation

## Overview
The favorites feature allows users to save their preferred wallpapers for quick access across all platforms (Windows, Android, iOS, and Web).

## Implementation Details

### Architecture
The favorites system uses a centralized utility module (`utils/favoritesManager.ts`) that provides consistent functionality across all screens.

### Storage
- **Technology**: `expo-file-system`
- **Storage Location**: `${FileSystem.documentDirectory}favorites.json`
- **Format**: JSON array of wallpaper objects
- **Cross-Platform**: Works on Windows (.exe), Android (.apk), iOS (.ipa), and Web

### Storage Locations by Platform
- **Windows**: `%LOCALAPPDATA%\Packages\<app-package-name>\LocalState\favorites.json`
- **Android**: `/data/data/<package-name>/files/favorites.json`
- **iOS**: `<app-container>/Documents/favorites.json`
- **Web**: Browser's IndexedDB (via expo-file-system polyfill)

## Features

### 1. Add to Favorites
Users can add wallpapers to their favorites from:
- Wallpaper gallery screen (grid/list view)
- Wallpaper preview/details screen
- Category browsing screens

**Implementation**:
```typescript
import { addToFavorites } from '../utils/favoritesManager';

const handleAddFavorite = async () => {
  await addToFavorites(wallpaper);
};
```

### 2. Remove from Favorites
Users can remove wallpapers from:
- Favorites screen (dedicated favorites view)
- Wallpaper gallery screen
- Wallpaper preview/details screen

**Implementation**:
```typescript
import { removeFromFavorites } from '../utils/favoritesManager';

const handleRemoveFavorite = async (wallpaperId: number) => {
  await removeFromFavorites(wallpaperId);
};
```

### 3. Toggle Favorites
Quick toggle functionality that automatically adds or removes based on current state:

**Implementation**:
```typescript
import { toggleFavorite } from '../utils/favoritesManager';

const handleToggleFavorite = async () => {
  await toggleFavorite(wallpaper);
};
```

### 4. View Favorites
Dedicated favorites screen showing all saved wallpapers in a responsive grid:
- **Desktop**: 6 columns
- **Tablet**: 3 columns
- **Mobile**: 2 columns

**Navigation**: Access via drawer menu or top navigation bar

## API Reference

### `favoritesManager.ts`

#### `loadFavorites(): Promise<Wallpaper[]>`
Loads all favorites from persistent storage.

**Returns**: Array of wallpaper objects

**Example**:
```typescript
const favorites = await loadFavorites();
console.log(`You have ${favorites.length} favorites`);
```

#### `saveFavorites(favorites: Wallpaper[]): Promise<boolean>`
Saves favorites array to persistent storage.

**Parameters**:
- `favorites`: Array of wallpaper objects to save

**Returns**: `true` if successful, `false` otherwise

#### `addToFavorites(wallpaper: Wallpaper): Promise<boolean>`
Adds a single wallpaper to favorites.

**Parameters**:
- `wallpaper`: Wallpaper object to add

**Returns**: `true` if successful, `false` otherwise

**Side Effects**: Shows alert to user

#### `removeFromFavorites(wallpaperId: number): Promise<boolean>`
Removes a wallpaper from favorites by ID.

**Parameters**:
- `wallpaperId`: ID of wallpaper to remove

**Returns**: `true` if successful, `false` otherwise

**Side Effects**: Shows alert to user

#### `toggleFavorite(wallpaper: Wallpaper): Promise<boolean>`
Toggles favorite status (add if not favorited, remove if favorited).

**Parameters**:
- `wallpaper`: Wallpaper object to toggle

**Returns**: `true` if successful, `false` otherwise

**Side Effects**: Shows alert to user

#### `isFavorited(wallpaperId: number): Promise<boolean>`
Checks if a wallpaper is currently favorited.

**Parameters**:
- `wallpaperId`: ID of wallpaper to check

**Returns**: `true` if favorited, `false` otherwise

#### `getFavoriteIds(): Promise<number[]>`
Gets array of favorite wallpaper IDs (lightweight check).

**Returns**: Array of wallpaper IDs

## Data Structure

### Wallpaper Interface
```typescript
interface Wallpaper {
  id: number;           // Unique identifier
  title: string;        // Wallpaper title
  image: string;        // Image URL or URI
  tag: string;          // Category tag
  description?: string; // Optional description
}
```

## User Experience

### Visual Indicators
- **Favorited**: Filled heart icon (❤️) in yellow/orange (#FBB03B)
- **Not Favorited**: Outlined heart icon (🤍) in white/gray

### Feedback
- **Add**: Alert "Added - Wallpaper added to favorites"
- **Remove**: Alert "Removed - Wallpaper removed from favorites"
- **Already Added**: Alert "Already Added - This wallpaper is already in your favorites"
- **Error**: Alert "Error - Failed to update favorites"

### Empty State
When no favorites are saved:
- Displays empty state illustration
- Shows message: "No Saved Wallpapers"
- Provides "Browse Wallpapers" button to explore content

## Screens Using Favorites

### 1. `app/wallpaper.tsx`
Main wallpaper gallery with grid/list view
- Heart icon on each wallpaper card
- Toggle favorite on tap
- Visual indicator for favorited items

### 2. `app/favoriteScreen.tsx`
Dedicated favorites view
- Displays all saved favorites
- Remove favorite on heart icon tap
- Navigate to wallpaper details on card tap
- Responsive grid layout

### 3. `app/WallpaperDetails.tsx`
Individual wallpaper details (if implemented)
- Add/Remove favorite button
- Full wallpaper preview

## Platform-Specific Considerations

### Windows (.exe)
- Favorites stored in LocalState folder
- Persists across app restarts
- Accessible via File Explorer at app data location

### Android (.apk)
- Favorites stored in app's private files directory
- Requires READ_EXTERNAL_STORAGE permission (already configured)
- Persists across app restarts
- Cleared on app uninstall

### iOS (.ipa)
- Favorites stored in app's Documents directory
- Backed up to iCloud (if enabled)
- Persists across app restarts

### Web
- Uses IndexedDB via expo-file-system polyfill
- Persists in browser storage
- Cleared when browser cache is cleared

## Testing

### Manual Testing Checklist
- [ ] Add wallpaper to favorites from gallery
- [ ] Remove wallpaper from favorites
- [ ] Toggle favorite status multiple times
- [ ] Navigate to favorites screen
- [ ] Verify favorites persist after app restart
- [ ] Test on Windows build
- [ ] Test on Android build
- [ ] Test on iOS build
- [ ] Test empty state display
- [ ] Test error handling (storage full, permissions)

### Test Scenarios
1. **Add 50+ wallpapers** - Verify performance with large dataset
2. **Rapid toggling** - Test race conditions
3. **Offline mode** - Verify local storage works without network
4. **Storage limits** - Test behavior when storage is full
5. **Concurrent access** - Multiple screens accessing favorites

## Troubleshooting

### Issue: Favorites not persisting
**Solution**: Check file system permissions and ensure `expo-file-system` is properly installed

### Issue: Duplicate favorites
**Solution**: The system checks for duplicates before adding. If duplicates exist, manually clear the favorites file.

### Issue: Slow performance with many favorites
**Solution**: Use `getFavoriteIds()` for quick checks instead of loading full wallpaper objects

### Issue: Favorites cleared on app update
**Solution**: Ensure app package name remains consistent across updates

## Future Enhancements
- [ ] Cloud sync across devices
- [ ] Favorite collections/folders
- [ ] Share favorites with other users
- [ ] Export/Import favorites
- [ ] Favorite wallpaper statistics
- [ ] Auto-backup to cloud storage
- [ ] Favorite wallpaper slideshow

