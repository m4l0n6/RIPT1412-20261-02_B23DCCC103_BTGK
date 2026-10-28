import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING} from '../theme/colors';

interface Props<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <View style={styles.wrap}>
      {options.map(opt => {
        const selected = opt === value;
        return (
          <Pressable
            key={opt}
            accessibilityRole="radio"
            accessibilityState={{checked: selected}}
            onPress={() => onChange(opt)}
            style={({pressed}) => [
              styles.item,
              selected && styles.itemSelected,
              pressed && !selected && styles.pressed,
            ]}>
            <Text
              numberOfLines={1}
              style={[styles.text, selected && styles.textSelected]}>
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.track,
    borderRadius: RADIUS.sm,
    padding: 3,
  },
  item: {
    flex: 1,
    minWidth: 92,
    minHeight: 44,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSelected: {backgroundColor: COLORS.primary},
  pressed: {opacity: 0.6},
  text: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  textSelected: {
    fontFamily: FONT_FAMILY.semibold,
    color: COLORS.white,
  },
});
