import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WallpaperData {
  imageUri: string;
  category: string;
  selectionName: string;
}

interface WallpaperContextType {
  activeWallpaper: WallpaperData | null;
  setActiveWallpaper: (wallpaper: WallpaperData | null) => void;
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

export const WallpaperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWallpaper, setActiveWallpaper] = useState<WallpaperData | null>(null);

  return (
    <WallpaperContext.Provider value={{ activeWallpaper, setActiveWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => {
  const context = useContext(WallpaperContext);
  if (context === undefined) {
    throw new Error('useWallpaper must be used within a WallpaperProvider');
  }
  return context;
};

