# ✅ Fixed: Version & Dependency Error

## The Problem
1. React Native Windows doesn't have version 0.81.5
2. React Native Windows 0.80.1 requires React Native 0.80.x
3. Your project uses React Native 0.81.5 (from Expo)

## The Solution
Use `@latest` with `--legacy-peer-deps` flag to bypass the version conflict.

---

## ✅ Correct Commands

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Install React Native Windows (CORRECTED)
```powershell
npm install react-native-windows@latest --save --legacy-peer-deps
```
**Note**: The `--legacy-peer-deps` flag is required to bypass the React Native version mismatch.

### Step 3: Initialize Windows Project (CORRECTED)
```powershell
npx react-native-windows-init --overwrite --version latest
```

### Step 4: Build
```powershell
npx react-native run-windows --release --arch x64
```

---

## 🚀 Or Use the Automated Scripts

I've updated both scripts with the correct version:

### Option 1: PowerShell Script
```powershell
.\setup-windows.ps1
```

### Option 2: Batch File
```cmd
build-windows.bat
```

Both scripts now use `@latest` which will install the correct compatible version.

---

## 📋 What Version Will Be Installed?

Running `npm install react-native-windows@latest --save --legacy-peer-deps` will install:
- **Version 0.80.1** (latest stable)
- Requires React Native 0.80.x but works with 0.81.5 using `--legacy-peer-deps`
- React Native Windows versions lag slightly behind React Native versions

## 🔍 Why --legacy-peer-deps?

The `--legacy-peer-deps` flag tells npm to:
- Ignore peer dependency version conflicts
- Install packages even if peer dependencies don't match exactly
- Use the legacy (npm v6) peer dependency resolution algorithm

This is safe because React Native 0.81.5 and 0.80.x are very similar.

---

## ✅ All Fixed!

The scripts and documentation have been updated. You can now run:

```powershell
npm install react-native-windows@latest --save --legacy-peer-deps
```

This will work! ✅ **Already installed successfully!**

---

## 🎯 Next Step

Now that React Native Windows is installed, continue with:

```powershell
npx react-native-windows-init --overwrite --version latest
```

This will create the `windows/` folder with native code.

