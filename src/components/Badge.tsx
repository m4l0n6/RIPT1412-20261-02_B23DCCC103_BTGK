import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING} from '../theme/colors';

interface Props {
  label: string;
  color: string;
  filled?: boolean; // true: nền đặc, chữ trắng
}

export default function Badge({label, color, filled}: Props) {
  return (
    <View
      style={[
        styles.badge,
        {borderColor: color, backgroundColor: filled ? color : color + '1A'},
      ]}>
      <Text
        style={[
          styles.text,
          {color: filled ? COLORS.white : color},
          filled && color === COLORS.success && styles.textOnSuccess,
        ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 0,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    marginRight: SPACING.sm,
    marginBottom: SPACING.xs,
    alignSelf: 'flex-start',
    flexShrink: 0,
  },
  text: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.small,
    lineHeight: 18,
  },
  textOnSuccess: {color: COLORS.primary},
});
