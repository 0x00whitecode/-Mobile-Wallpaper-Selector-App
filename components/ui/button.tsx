import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  textStyle,
  icon,
  onPress,
}) => {
  const variantStyle = getVariantStyle(variant);
  const sizeStyle = getSizeStyle(size);
  const textVariantStyle = getTextVariantStyle(variant);

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle, sizeStyle, disabled && styles.disabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.text, textVariantStyle, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// 🔹 Helper functions to avoid dynamic indexing
const getVariantStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'destructive':
      return styles.destructive;
    case 'outline':
      return styles.outline;
    case 'secondary':
      return styles.secondary;
    case 'ghost':
      return styles.ghost;
    case 'link':
      return styles.link;
    default:
      return styles.default;
  }
};

const getSizeStyle = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return styles.sm;
    case 'lg':
      return styles.lg;
    case 'icon':
      return styles.icon;
    default:
      return styles.defaultSize;
  }
};

const getTextVariantStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'destructive':
      return styles.text_destructive;
    case 'outline':
      return styles.text_outline;
    case 'secondary':
      return styles.text_secondary;
    case 'ghost':
      return styles.text_ghost;
    case 'link':
      return styles.text_link;
    default:
      return styles.text_default;
  }
};

// 🧱 Styles
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Variants
  default: { backgroundColor: '#007bff' },
  destructive: { backgroundColor: '#dc3545' },
  outline: { borderWidth: 1, borderColor: '#999', backgroundColor: 'transparent' },
  secondary: { backgroundColor: '#6c757d' },
  ghost: { backgroundColor: 'transparent' },
  link: { backgroundColor: 'transparent' },

  // Sizes
  defaultSize: { height: 36, paddingHorizontal: 16, paddingVertical: 8 },
  sm: { height: 32, paddingHorizontal: 12, borderRadius: 6 },
  lg: { height: 44, paddingHorizontal: 24, borderRadius: 10 },
  icon: { height: 36, width: 36, alignItems: 'center', justifyContent: 'center' },

  // Text Styles
  text: { fontSize: 14, fontWeight: '600' },
  text_default: { color: '#fff' },
  text_destructive: { color: '#fff' },
  text_outline: { color: '#000' },
  text_secondary: { color: '#fff' },
  text_ghost: { color: '#007bff' },
  text_link: { color: '#007bff', textDecorationLine: 'underline' },

  // Misc
  disabled: { opacity: 0.5 },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  iconContainer: { marginRight: 6 },
});

export default Button;
