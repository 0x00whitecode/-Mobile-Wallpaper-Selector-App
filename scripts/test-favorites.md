# Favorites Feature Testing Guide

## Prerequisites
- App built and running on target platform (Windows, Android, iOS, or Web)
- Test wallpapers available in the app

## Test Plan

### Test 1: Add Wallpaper to Favorites
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Launch the app
2. Navigate to wallpaper gallery (Browse or Categories)
3. Tap the heart icon on any wallpaper card
4. Verify alert appears: "Added - Wallpaper added to favorites"
5. Verify heart icon changes from outline to filled (yellow/orange color)

**Expected Result**: ✅ Wallpaper is added to favorites, visual indicator updates

---

### Test 2: Remove Wallpaper from Favorites
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. With a wallpaper already favorited (from Test 1)
2. Tap the filled heart icon on the same wallpaper
3. Verify alert appears: "Removed - Wallpaper removed from favorites"
4. Verify heart icon changes from filled to outline

**Expected Result**: ✅ Wallpaper is removed from favorites, visual indicator updates

---

### Test 3: View Favorites Screen
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Add 3-5 wallpapers to favorites
2. Navigate to Favorites screen (via drawer menu or top nav)
3. Verify all favorited wallpapers are displayed
4. Verify responsive grid layout:
   - Desktop (≥900px): 6 columns
   - Tablet (768-899px): 3 columns
   - Mobile (<768px): 2 columns

**Expected Result**: ✅ All favorites displayed in responsive grid

---

### Test 4: Remove from Favorites Screen
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Navigate to Favorites screen
2. Tap the heart icon on any favorite wallpaper
3. Verify alert appears: "Removed - Wallpaper removed from favorites"
4. Verify wallpaper is removed from the grid immediately

**Expected Result**: ✅ Wallpaper removed from favorites screen

---

### Test 5: Empty Favorites State
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Remove all wallpapers from favorites
2. Navigate to Favorites screen
3. Verify empty state is displayed:
   - Empty state illustration
   - "No Saved Wallpapers" title
   - "Start saving your favorite wallpapers to see them here" message
   - "Browse Wallpapers" button

**Expected Result**: ✅ Empty state displayed correctly

---

### Test 6: Persistence After App Restart
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Add 5 wallpapers to favorites
2. Close the app completely (force quit)
3. Reopen the app
4. Navigate to Favorites screen
5. Verify all 5 wallpapers are still favorited

**Expected Result**: ✅ Favorites persist after app restart

---

### Test 7: Duplicate Prevention
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Add a wallpaper to favorites
2. Try to add the same wallpaper again
3. Verify alert appears: "Already Added - This wallpaper is already in your favorites"
4. Verify wallpaper is not duplicated in favorites

**Expected Result**: ✅ Duplicate prevention works

---

### Test 8: Navigate from Favorites to Wallpaper Details
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Navigate to Favorites screen
2. Tap on any favorite wallpaper card (not the heart icon)
3. Verify navigation to wallpaper gallery/details screen
4. Verify correct category is displayed

**Expected Result**: ✅ Navigation works correctly

---

### Test 9: Large Dataset Performance
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Add 50+ wallpapers to favorites (may need to script this)
2. Navigate to Favorites screen
3. Verify smooth scrolling
4. Verify no lag when adding/removing favorites
5. Verify app doesn't crash

**Expected Result**: ✅ App performs well with large dataset

---

### Test 10: Rapid Toggle Test
**Platform**: All (Windows, Android, iOS, Web)

**Steps**:
1. Rapidly tap the heart icon on a wallpaper 10 times
2. Verify final state is consistent
3. Check Favorites screen to verify correct state
4. Verify no duplicate entries

**Expected Result**: ✅ Toggle handles rapid taps correctly

---

## Platform-Specific Tests

### Windows (.exe) Specific Tests

#### Test W1: File System Access
**Steps**:
1. Add wallpapers to favorites
2. Navigate to: `%LOCALAPPDATA%\Packages\<app-package-name>\LocalState\`
3. Verify `favorites.json` file exists
4. Open file and verify JSON structure

**Expected Result**: ✅ File exists and contains valid JSON

#### Test W2: Persistence Across Updates
**Steps**:
1. Add favorites in version 1.0
2. Update app to version 1.1
3. Verify favorites are retained

**Expected Result**: ✅ Favorites persist across updates

---

### Android (.apk) Specific Tests

#### Test A1: Storage Permissions
**Steps**:
1. Install app
2. Check app permissions in Android settings
3. Verify READ_EXTERNAL_STORAGE permission is granted
4. Add wallpapers to favorites
5. Verify no permission errors

**Expected Result**: ✅ Permissions work correctly

#### Test A2: App Data Persistence
**Steps**:
1. Add favorites
2. Clear app cache (Settings > Apps > Clear Cache)
3. Reopen app
4. Verify favorites are still present

**Expected Result**: ✅ Favorites survive cache clear

#### Test A3: Uninstall/Reinstall
**Steps**:
1. Add favorites
2. Uninstall app
3. Reinstall app
4. Check favorites

**Expected Result**: ⚠️ Favorites are cleared (expected behavior)

---

### iOS (.ipa) Specific Tests

#### Test I1: iCloud Backup
**Steps**:
1. Add favorites with iCloud backup enabled
2. Restore app on another iOS device
3. Verify favorites are synced

**Expected Result**: ✅ Favorites backed up to iCloud

#### Test I2: App Backgrounding
**Steps**:
1. Add favorites
2. Background the app
3. Wait 5 minutes
4. Reopen app
5. Verify favorites are intact

**Expected Result**: ✅ Favorites persist after backgrounding

---

### Web Specific Tests

#### Test WEB1: Browser Storage
**Steps**:
1. Add favorites in Chrome
2. Close browser tab
3. Reopen app in new tab
4. Verify favorites are present

**Expected Result**: ✅ Favorites persist in browser storage

#### Test WEB2: Incognito Mode
**Steps**:
1. Open app in incognito/private mode
2. Add favorites
3. Close incognito window
4. Reopen app in incognito mode
5. Check favorites

**Expected Result**: ⚠️ Favorites cleared (expected behavior)

---

## Error Handling Tests

### Test E1: Storage Full
**Steps**:
1. Fill device storage to near capacity
2. Try to add wallpaper to favorites
3. Verify error alert appears
4. Verify app doesn't crash

**Expected Result**: ✅ Graceful error handling

### Test E2: Corrupted Favorites File
**Steps**:
1. Manually corrupt the favorites.json file
2. Reopen app
3. Verify app handles corruption gracefully
4. Verify app creates new favorites file

**Expected Result**: ✅ App recovers from corruption

### Test E3: Network Offline
**Steps**:
1. Turn off network connection
2. Add wallpapers to favorites
3. Verify favorites are saved locally
4. Turn network back on
5. Verify favorites are still present

**Expected Result**: ✅ Favorites work offline

---

## Regression Tests

### Test R1: Existing Features Still Work
**Steps**:
1. Verify wallpaper browsing works
2. Verify category navigation works
3. Verify settings work
4. Verify wallpaper preview works

**Expected Result**: ✅ No regressions in existing features

---

## Automated Testing (Future)

### Unit Tests
```typescript
// Example unit test structure
describe('favoritesManager', () => {
  test('addToFavorites adds wallpaper', async () => {
    const wallpaper = { id: 1, title: 'Test', image: 'url', tag: 'nature' };
    const result = await addToFavorites(wallpaper);
    expect(result).toBe(true);
  });

  test('removeFromFavorites removes wallpaper', async () => {
    const result = await removeFromFavorites(1);
    expect(result).toBe(true);
  });

  test('toggleFavorite toggles state', async () => {
    const wallpaper = { id: 2, title: 'Test2', image: 'url', tag: 'nature' };
    await toggleFavorite(wallpaper);
    const isFav = await isFavorited(2);
    expect(isFav).toBe(true);
  });
});
```

---

## Test Results Template

| Test ID | Test Name | Windows | Android | iOS | Web | Notes |
|---------|-----------|---------|---------|-----|-----|-------|
| Test 1  | Add to Favorites | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 2  | Remove from Favorites | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 3  | View Favorites Screen | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 4  | Remove from Favorites Screen | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 5  | Empty State | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 6  | Persistence | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 7  | Duplicate Prevention | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 8  | Navigation | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 9  | Large Dataset | ⬜ | ⬜ | ⬜ | ⬜ | |
| Test 10 | Rapid Toggle | ⬜ | ⬜ | ⬜ | ⬜ | |

Legend: ✅ Pass | ❌ Fail | ⚠️ Warning | ⬜ Not Tested

---

## Reporting Issues

When reporting issues, include:
1. Platform and version (e.g., Windows 11, Android 13)
2. App version
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots/videos if applicable
6. Console logs/error messages

