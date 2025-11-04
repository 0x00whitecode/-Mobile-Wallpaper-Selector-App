import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Badge = ({ variant = 'default', label, style, ...props }) => {
  // Determine the variant style
  const variantStyle = (() => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'destructive':
        return styles.destructive;
      case 'outline':
        return styles.outline;
      default:
        return styles.default;
    }
  })();

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle, style]}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[styles.text, styles[`text_${variant}`]]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: 'center',
  },

  // Variants
  default: {
    backgroundColor: '#007bff',
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  secondary: {
    backgroundColor: '#6c757d',
    borderColor: 'transparent',
  },
  destructive: {
    backgroundColor: '#dc3545',
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#333',
  },

  // Text colors for each variant
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  text_default: {
    color: '#fff',
  },
  text_secondary: {
    color: '#fff',
  },
  text_destructive: {
    color: '#fff',
  },
  text_outline: {
    color: '#333',
  },
});

export default Badge;
