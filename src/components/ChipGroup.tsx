import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING} from '../theme/colors';

interface Props<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  singleLine?: boolean;
}

export default function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  singleLine = false,
}: Props<T>) {
  return (
    <View style={[styles.row, singleLine && styles.singleLine]}>
      {options.map(opt => {
        const selected = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={({pressed}) => [
              styles.chip,
              singleLine && styles.singleLineChip,
              selected && styles.chipSelected,
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  singleLine: {flexWrap: 'nowrap'},
  singleLineChip: {flexShrink: 0, marginBottom: 0},
  chip: {
    minHeight: 44,
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    marginRight: 6,
    marginBottom: SPACING.sm,
  },
  chipSelected: {
    backgroundColor: COLORS.text,
    borderColor: COLORS.text,
  },
  pressed: {opacity: 0.7},
  text: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.body,
    color: COLORS.text,
    lineHeight: 20,
  },
  textSelected: {
    fontFamily: FONT_FAMILY.semibold,
    color: COLORS.primary,
  },
});
