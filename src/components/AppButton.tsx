import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING} from '../theme/colors';

type Variant = 'primary' | 'danger' | 'outline';

interface Props {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'danger' && styles.danger,
        variant === 'outline' && styles.outline,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}>
      <Text
        style={[
          styles.text,
          variant === 'outline' && styles.textOutline,
          disabled && styles.textDisabled,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primary: {backgroundColor: COLORS.white, borderColor: COLORS.white},
  danger: {backgroundColor: COLORS.white, borderColor: COLORS.white},
  outline: {backgroundColor: COLORS.background, borderColor: COLORS.text},
  disabled: {
    backgroundColor: COLORS.disabledBg,
    borderColor: COLORS.disabledBg,
  },
  pressed: {opacity: 0.65},
  text: {
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.body,
    lineHeight: 20,
    textAlign: 'center',
  },
  textOutline: {color: COLORS.text},
  textDisabled: {color: COLORS.disabled},
});
