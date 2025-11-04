# Building Windows .exe for Wallpaper App

## Prerequisites

### 1. Install Node.js
Download and install Node.js (LTS version recommended):
- **Download**: https://nodejs.org/
- **Version**: 18.x or 20.x LTS
- **Installation**: Run the installer and follow the prompts
- **Verify**: Open PowerShell and run:
  ```powershell
  node --version
  npm --version
  ```

### 2. Install Visual Studio 2022 (Required for Windows builds)
React Native Windows requires Visual Studio with specific components:

**Download**: https://visualstudio.microsoft.com/downloads/

**Required Workloads**:
- ✅ Desktop development with C++
- ✅ Universal Windows Platform development

**Required Individual Components**:
- ✅ MSVC v143 - VS 2022 C++ x64/x86 build tools
- ✅ Windows 10 SDK (10.0.19041.0 or higher)
- ✅ C++ CMake tools for Windows

**Installation Steps**:
1. Run Visual Studio Installer
2. Select "Desktop development with C++"
3. Select "Universal Windows Platform development"
4. Click "Install" (this may take 30-60 minutes)

### 3. Install Windows SDK
If not included with Visual Studio:
- **Download**: https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/
- **Version**: Windows 10 SDK (10.0.19041.0 or higher)

---

## Build Process

### Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
# Navigate to project directory
cd c:\Users\USER\Desktop\wallpaer

# Install project dependencies
npm install

# Install React Native Windows
npm install react-native-windows@0.81.5 --save

# Install React Native Windows CLI globally
npm install -g react-native-windows-cli
```

**Expected Output**:
```
added 1234 packages in 2m
```

---

### Step 2: Initialize Windows Project

```powershell
# Initialize React Native Windows
npx react-native-windows-init --overwrite
```

**What this does**:
- Creates `windows/` directory with native Windows code
- Generates Visual Studio solution files (.sln)
- Sets up Windows-specific configuration

**Expected Output**:
```
✔ Generating React Native Windows template project
✔ Installing dependencies
✔ Linking native modules
```

---

### Step 3: Verify Windows Configuration

Check that these files were created:
```
windows/
├── WallpaperApp.sln          # Visual Studio solution
├── WallpaperApp/
│   ├── WallpaperApp.vcxproj  # Project file
│   ├── App.xaml              # Windows app definition
│   └── MainPage.xaml         # Main window
└── packages.config
```

---

### Step 4: Build the Windows App

#### Option A: Build via Command Line (Recommended)

```powershell
# Build in Release mode for production
npx react-native run-windows --release --arch x64

# Or for Debug mode (faster, includes debugging symbols)
npx react-native run-windows --arch x64
```

**Build Options**:
- `--release`: Production build (optimized, smaller size)
- `--arch x64`: 64-bit architecture (recommended)
- `--arch x86`: 32-bit architecture
- `--no-deploy`: Build without launching the app

**Expected Output**:
```
info Building the app...
info Build succeeded
info Installing the app...
info Starting the app...
```

#### Option B: Build via Visual Studio

1. Open `windows/WallpaperApp.sln` in Visual Studio 2022
2. Select **Release** configuration (top toolbar)
3. Select **x64** platform (top toolbar)
4. Click **Build > Build Solution** (or press Ctrl+Shift+B)
5. Wait for build to complete (5-15 minutes first time)

---

### Step 5: Locate the .exe File

After successful build, find your .exe at:

**Release Build**:
```
windows\WallpaperApp\x64\Release\WallpaperApp.exe
```

**Debug Build**:
```
windows\WallpaperApp\x64\Debug\WallpaperApp.exe
```

**File Size**: Approximately 50-150 MB (Release) or 200-400 MB (Debug)

---

## Creating a Distributable Package

### Option 1: Simple Copy (Quick Distribution)

Copy the entire output folder:
```powershell
# Create distribution folder
New-Item -ItemType Directory -Path ".\dist\WallpaperApp-Windows" -Force

# Copy executable and dependencies
Copy-Item -Path ".\windows\WallpaperApp\x64\Release\*" -Destination ".\dist\WallpaperApp-Windows\" -Recurse

# Create ZIP archive
Compress-Archive -Path ".\dist\WallpaperApp-Windows\*" -DestinationPath ".\dist\WallpaperApp-Windows-v1.0.0.zip"
```

**Distribution**:
- Share the ZIP file
- Users extract and run `WallpaperApp.exe`
- Requires .NET Framework 4.7.2+ on target machine

---

### Option 2: MSIX Package (Microsoft Store Ready)

Create a proper Windows installer package:

```powershell
# Build MSIX package
npx react-native run-windows --release --arch x64 --bundle --no-deploy

# Package location
# windows\WallpaperApp\AppPackages\WallpaperApp_1.0.0.0_x64_Release_Test\
```

**Benefits**:
- Professional installer
- Auto-updates support
- Microsoft Store compatible
- Signed package

**To install MSIX**:
1. Right-click the `.msix` file
2. Select "Install"
3. App appears in Start Menu

---

### Option 3: Create Installer with Inno Setup

Download Inno Setup: https://jrsoftware.org/isdl.php

Create `installer-script.iss`:
```iss
[Setup]
AppName=Wallpaper Studio
AppVersion=1.0.0
DefaultDirName={pf}\WallpaperStudio
DefaultGroupName=Wallpaper Studio
OutputDir=dist
OutputBaseFilename=WallpaperStudio-Setup-v1.0.0
Compression=lzma2
SolidCompression=yes

[Files]
Source: "windows\WallpaperApp\x64\Release\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{group}\Wallpaper Studio"; Filename: "{app}\WallpaperApp.exe"
Name: "{commondesktop}\Wallpaper Studio"; Filename: "{app}\WallpaperApp.exe"

[Run]
Filename: "{app}\WallpaperApp.exe"; Description: "Launch Wallpaper Studio"; Flags: postinstall nowait skipifsilent
```

Compile with Inno Setup to create `WallpaperStudio-Setup-v1.0.0.exe`

---

## Troubleshooting

### Error: "MSBuild not found"
**Solution**: Install Visual Studio 2022 with C++ workload

### Error: "Windows SDK not found"
**Solution**: Install Windows 10 SDK (10.0.19041.0+)

### Error: "node_modules not found"
**Solution**: Run `npm install` first

### Error: "Cannot find module 'react-native-windows'"
**Solution**: Run `npm install react-native-windows@0.81.5 --save`

### Error: Build fails with C++ errors
**Solution**: 
1. Clean build: `npx react-native run-windows --clean`
2. Delete `windows\WallpaperApp\x64` folder
3. Rebuild

### Error: "The system cannot find the path specified"
**Solution**: Run `npx react-native-windows-init` first

### App crashes on startup
**Solution**: 
1. Build in Debug mode to see error messages
2. Check that all assets are bundled
3. Verify `app.json` configuration

---

## Testing the .exe

### On Your Development Machine
```powershell
# Run the built executable
.\windows\WallpaperApp\x64\Release\WallpaperApp.exe
```

### On Another Windows Machine
1. Copy the entire Release folder to the target machine
2. Ensure .NET Framework 4.7.2+ is installed
3. Run `WallpaperApp.exe`

**Test Checklist**:
- [ ] App launches successfully
- [ ] UI displays correctly
- [ ] Navigation works
- [ ] Favorites feature works
- [ ] Wallpapers load
- [ ] Settings persist
- [ ] App closes cleanly

---

## Performance Optimization

### Reduce .exe Size
```powershell
# Build with optimizations
npx react-native run-windows --release --arch x64

# Enable tree shaking in metro.config.js
# Add to metro.config.js:
module.exports = {
  transformer: {
    minifierConfig: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      },
    },
  },
};
```

### Improve Startup Time
1. Use Release build (not Debug)
2. Enable bundle optimization
3. Lazy load heavy components

---

## Distribution Checklist

Before distributing your .exe:

- [ ] Build in Release mode
- [ ] Test on clean Windows machine
- [ ] Verify all features work
- [ ] Check file size is reasonable
- [ ] Include README.txt with instructions
- [ ] Test favorites persistence
- [ ] Verify no console errors
- [ ] Check memory usage
- [ ] Test on Windows 10 and 11
- [ ] Create installer (optional)
- [ ] Sign the executable (optional, for trust)

---

## Quick Start Commands

```powershell
# Complete build process (run these in order)
npm install
npm install react-native-windows@0.81.5 --save
npx react-native-windows-init --overwrite
npx react-native run-windows --release --arch x64

# Find your .exe at:
# windows\WallpaperApp\x64\Release\WallpaperApp.exe
```

---

## Next Steps

After building the .exe:
1. Test thoroughly on your machine
2. Test on another Windows machine
3. Create installer package (optional)
4. Distribute to users
5. Collect feedback
6. Iterate and improve

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review React Native Windows docs: https://microsoft.github.io/react-native-windows/
3. Check build logs in `windows\WallpaperApp\x64\Release\`
4. Verify all prerequisites are installed

