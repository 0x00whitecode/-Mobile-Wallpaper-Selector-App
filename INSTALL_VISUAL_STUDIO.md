# ⚠️ Visual Studio 2022 Required

## The Problem
```
× Unable to find vswhere at C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe
```

**React Native Windows requires Visual Studio 2022** to build native Windows apps.

---

## ✅ Solution: Install Visual Studio 2022

### Option 1: Automatic Installation (Recommended)

React Native Windows includes a script to install dependencies automatically.

#### Step 1: Open PowerShell as Administrator
1. Press `Windows + X`
2. Select **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**
3. Click **Yes** on the UAC prompt

#### Step 2: Run the dependency installer
```powershell
cd C:\Users\USER\Desktop\wallpaer
.\node_modules\react-native-windows\scripts\rnw-dependencies.ps1
```

This will:
- ✅ Install Visual Studio 2022 Build Tools
- ✅ Install required C++ workloads
- ✅ Install Windows SDK
- ✅ Configure everything automatically

**Time**: 30-60 minutes  
**Size**: ~10-15 GB

---

### Option 2: Manual Installation

If the automatic script doesn't work, install manually:

#### Step 1: Download Visual Studio 2022
**Link**: https://visualstudio.microsoft.com/downloads/

**Choose**: Community Edition (Free)

#### Step 2: Select Workloads During Installation

When the installer opens, select these workloads:

✅ **Desktop development with C++**
   - MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)
   - Windows 10 SDK (10.0.19041.0 or higher)
   - C++ CMake tools for Windows
   - C++ ATL for latest build tools

✅ **Universal Windows Platform development**
   - Windows 10 SDK (10.0.19041.0)
   - C++ (v143) Universal Windows Platform tools

#### Step 3: Install
- Click **Install**
- Wait 30-60 minutes
- Restart your computer

---

## 🚀 After Installing Visual Studio

### Step 1: Verify Installation
Open a new PowerShell window and run:
```powershell
cd C:\Users\USER\Desktop\wallpaer
npx react-native run-windows --arch x64
```

### Step 2: First Build (Debug Mode)
The first build will take 15-20 minutes:
```powershell
npx react-native run-windows --arch x64
```

This will:
- Initialize the Windows project (create `windows/` folder)
- Build the native code
- Launch your app

### Step 3: Build Release Version
Once the debug build works, create the production .exe:
```powershell
npx react-native run-windows --release --arch x64
```

**Location**: `windows\WallpaperApp\x64\Release\WallpaperApp.exe`

---

## 📋 System Requirements

### Minimum:
- Windows 10 version 1809 or higher
- 16 GB RAM
- 20 GB free disk space
- Internet connection

### Recommended:
- Windows 11
- 32 GB RAM
- SSD with 50 GB free space
- Fast internet connection

---

## 🎯 Quick Command Reference

```powershell
# Install dependencies (as Admin)
.\node_modules\react-native-windows\scripts\rnw-dependencies.ps1

# Build debug version (first time)
npx react-native run-windows --arch x64

# Build release version (production .exe)
npx react-native run-windows --release --arch x64

# Clean build (if errors occur)
npx react-native run-windows --clean --arch x64
```

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Download Visual Studio | 5-10 min |
| Install Visual Studio | 30-60 min |
| First build (Debug) | 15-20 min |
| Subsequent builds | 2-5 min |
| Release build | 10-15 min |

**Total first-time setup**: ~1-2 hours

---

## 🐛 Troubleshooting

### "vswhere.exe not found" after installing VS
**Solution**: Restart your computer and try again

### "MSBuild not found"
**Solution**: Make sure you selected "Desktop development with C++" workload

### "Windows SDK not found"
**Solution**: 
1. Open Visual Studio Installer
2. Click **Modify**
3. Add "Windows 10 SDK (10.0.19041.0 or higher)"

### Build fails with C++ errors
**Solution**: Make sure you installed the C++ workload, not just Visual Studio

---

## 💡 Alternative: Use Electron Instead

If you don't want to install Visual Studio (10-15 GB), you can use Electron instead:

### Pros of Electron:
- ✅ No Visual Studio required
- ✅ Faster setup (10-15 minutes)
- ✅ Smaller download
- ✅ Works on any Windows PC

### Cons of Electron:
- ❌ Larger .exe file (150-200 MB vs 50-100 MB)
- ❌ Slower performance (web-based)
- ❌ Higher memory usage

**To switch to Electron**, let me know and I'll reconfigure the project.

---

## ✅ Recommended Steps

1. **Install Visual Studio 2022** using Option 1 (automatic script) or Option 2 (manual)
2. **Restart your computer**
3. **Run the build command**:
   ```powershell
   npx react-native run-windows --arch x64
   ```
4. **Wait 15-20 minutes** for first build
5. **Test your app**
6. **Build release version**:
   ```powershell
   npx react-native run-windows --release --arch x64
   ```

---

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Make sure Visual Studio is fully installed
3. Restart your computer
4. Try the build command again

Or let me know if you want to switch to Electron instead!

---

**Ready to install? Run PowerShell as Administrator and execute:**
```powershell
cd C:\Users\USER\Desktop\wallpaer
.\node_modules\react-native-windows\scripts\rnw-dependencies.ps1
```

This will install everything you need automatically! 🚀

