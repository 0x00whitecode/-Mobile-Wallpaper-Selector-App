# 🪟 Build Native React Native Windows .exe

## Prerequisites (REQUIRED)

### 1. Install Node.js
- **Download**: https://nodejs.org/
- **Version**: 18.x or 20.x LTS
- **Verify**: Open PowerShell and run `node --version`

### 2. Install Visual Studio 2022 (REQUIRED)
React Native Windows requires Visual Studio with C++ tools.

**Download**: https://visualstudio.microsoft.com/downloads/

**Choose**: Community Edition (Free)

**Required Workloads** (Select during installation):
- ✅ **Desktop development with C++**
- ✅ **Universal Windows Platform development**

**Required Individual Components**:
- ✅ MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)
- ✅ Windows 10 SDK (10.0.19041.0 or higher)
- ✅ C++ CMake tools for Windows

**Installation Time**: 30-60 minutes
**Disk Space**: ~10-15 GB

---

## 🚀 Quick Build (Automated)

### Option 1: Run Setup Script

```powershell
# Allow script execution (one-time)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run the setup script
.\setup-windows.ps1
```

The script will:
1. Check prerequisites
2. Install dependencies
3. Install React Native Windows
4. Initialize Windows project
5. Build the .exe

**Total Time**: 20-30 minutes (first build)

---

## 🔧 Manual Build (Step by Step)

### Step 1: Install Dependencies
```powershell
npm install
```
⏱️ 5-10 minutes

### Step 2: Install React Native Windows
```powershell
npm install react-native-windows@latest --save --legacy-peer-deps
```
⏱️ 2-5 minutes

**Note**: We use `--legacy-peer-deps` because React Native Windows 0.80.x requires React Native 0.80.x, but Expo uses 0.81.5. This flag allows the installation to proceed.

### Step 3: Install CLI Tools
```powershell
npm install -g react-native-windows-cli
```
⏱️ 1 minute

### Step 4: Initialize Windows Project
```powershell
npx react-native-windows-init --overwrite --version latest
```
⏱️ 2-3 minutes

This creates the `windows/` folder with:
- WallpaperApp.sln (Visual Studio solution)
- Native C++ code
- XAML UI files
- Build configuration

### Step 5: Build Release Version
```powershell
npx react-native run-windows --release --arch x64
```
⏱️ 10-20 minutes (first build)

---

## 📦 Find Your .exe

After successful build:

**Location**: `windows\WallpaperApp\x64\Release\WallpaperApp.exe`

**Size**: ~50-100 MB

**Dependencies**: The .exe needs the entire Release folder to run

---

## 🎯 Build Options

### Debug Build (Faster, for testing)
```powershell
npx react-native run-windows --arch x64
```
- Faster build time
- Includes debugging symbols
- Larger file size
- Location: `windows\WallpaperApp\x64\Debug\WallpaperApp.exe`

### Release Build (Production)
```powershell
npx react-native run-windows --release --arch x64
```
- Optimized for performance
- Smaller file size
- No debugging symbols
- Location: `windows\WallpaperApp\x64\Release\WallpaperApp.exe`

### Build Without Running
```powershell
npx react-native run-windows --release --arch x64 --no-deploy
```
- Builds but doesn't launch the app
- Useful for CI/CD

### Clean Build
```powershell
npx react-native run-windows --release --arch x64 --clean
```
- Deletes previous build artifacts
- Rebuilds from scratch
- Use if build is failing

---

## 📁 Project Structure After Build

```
wallpaer/
├── windows/                           # Native Windows code
│   ├── WallpaperApp.sln              # Visual Studio solution
│   ├── WallpaperApp/                 # Main project
│   │   ├── x64/
│   │   │   ├── Release/              # Production build
│   │   │   │   ├── WallpaperApp.exe  # Your executable! 🎉
│   │   │   │   ├── *.dll             # Required libraries
│   │   │   │   └── assets/           # Bundled assets
│   │   │   └── Debug/                # Debug build
│   │   ├── App.xaml                  # Windows app definition
│   │   └── MainPage.xaml             # Main window
│   └── packages/                     # NuGet packages
├── app/                              # Your React Native code
├── components/                       # Your components
└── package.json
```

---

## 🎨 Distribution

### Option 1: Copy Release Folder (Simple)

Copy the entire Release folder:
```powershell
# Create distribution folder
New-Item -ItemType Directory -Path ".\dist" -Force

# Copy Release folder
Copy-Item -Path ".\windows\WallpaperApp\x64\Release" -Destination ".\dist\WallpaperStudio" -Recurse

# Create ZIP
Compress-Archive -Path ".\dist\WallpaperStudio\*" -DestinationPath ".\dist\WallpaperStudio-v1.0.0.zip"
```

**Share**: `WallpaperStudio-v1.0.0.zip`

**User Instructions**:
1. Extract ZIP
2. Run `WallpaperApp.exe`

---

### Option 2: Create Installer (Professional)

Use **Inno Setup** to create a professional installer:

1. **Download Inno Setup**: https://jrsoftware.org/isdl.php

2. **Create installer script** (`installer.iss`):
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

3. **Compile** with Inno Setup

**Output**: `dist\WallpaperStudio-Setup-v1.0.0.exe`

---

## 🐛 Troubleshooting

### "MSBuild not found"
**Problem**: Visual Studio not installed or C++ workload missing

**Solution**:
1. Install Visual Studio 2022
2. Select "Desktop development with C++"
3. Restart PowerShell

---

### "Windows SDK not found"
**Problem**: Windows SDK not installed

**Solution**:
1. Open Visual Studio Installer
2. Modify installation
3. Add "Windows 10 SDK (10.0.19041.0 or higher)"

---

### Build fails with C++ errors
**Problem**: Corrupted build cache

**Solution**:
```powershell
# Clean build
npx react-native run-windows --clean --release --arch x64

# Or manually delete
Remove-Item -Recurse -Force windows\WallpaperApp\x64
npx react-native run-windows --release --arch x64
```

---

### "react-native-windows-init" fails
**Problem**: Incompatible versions

**Solution**:
```powershell
# Use latest compatible version with legacy peer deps
npm install react-native-windows@latest --save --legacy-peer-deps

# Try again with version flag
npx react-native-windows-init --overwrite --version latest
```

---

### .exe crashes on startup
**Problem**: Missing dependencies or assets

**Solution**:
1. Build in Debug mode to see errors:
   ```powershell
   npx react-native run-windows --arch x64
   ```
2. Check console output for errors
3. Verify all assets are bundled

---

### "node_modules" errors
**Problem**: Corrupted dependencies

**Solution**:
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
npm install
```

---

## ✅ Testing Your .exe

### On Development Machine
```powershell
.\windows\WallpaperApp\x64\Release\WallpaperApp.exe
```

### Test Checklist
- [ ] App launches without errors
- [ ] UI displays correctly
- [ ] Navigation works (drawer, tabs)
- [ ] Browse wallpapers
- [ ] Add to favorites
- [ ] View favorites screen
- [ ] Favorites persist after restart
- [ ] Settings work
- [ ] No console errors
- [ ] Window resizing works
- [ ] App closes cleanly

### On Another Windows Machine
1. Copy entire Release folder to target machine
2. Run `WallpaperApp.exe`
3. Test all features

**Requirements for target machine**:
- Windows 10/11 (64-bit)
- No additional software needed!

---

## 📊 Build Performance

| Build Type | First Build | Subsequent Builds | File Size |
|------------|-------------|-------------------|-----------|
| Debug | 15-20 min | 2-5 min | 200-400 MB |
| Release | 20-30 min | 5-10 min | 50-100 MB |

---

## 🎯 System Requirements

### For Building:
- Windows 10/11 (64-bit)
- Visual Studio 2022 with C++ tools
- Node.js 18.x or 20.x
- 16 GB RAM (recommended)
- 20 GB free disk space
- Internet connection (first build)

### For Running (User's Machine):
- Windows 10/11 (64-bit)
- 4 GB RAM
- 500 MB disk space
- No Visual Studio needed!
- No Node.js needed!

---

## 🚀 Quick Command Reference

```powershell
# Complete build process
npm install
npm install react-native-windows@latest --save --legacy-peer-deps
npx react-native-windows-init --overwrite --version latest
npx react-native run-windows --release --arch x64

# Find .exe at:
# windows\WallpaperApp\x64\Release\WallpaperApp.exe
```

---

## 📝 Next Steps

1. ✅ Install Visual Studio 2022 (if not installed)
2. ✅ Run `.\setup-windows.ps1` or manual commands
3. ✅ Wait for build to complete (20-30 min)
4. ✅ Test the .exe
5. ✅ Create distribution package
6. ✅ Share with users!

---

**Ready to build? Run:**
```powershell
.\setup-windows.ps1
```

Or follow the manual steps above! 🎉

