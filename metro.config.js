// metro.config.js
// ✅ Expo-compatible Metro configuration

const { getDefaultConfig } = require('expo/metro-config');

// Get the default Expo Metro configuration
const config = getDefaultConfig(__dirname);

// Export it directly — no Windows or custom path resolution needed
module.exports = config;
