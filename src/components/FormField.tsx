import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_FAMILY, FONT_SIZE, SPACING} from '../theme/colors';

interface Props {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export default function FormField({label, error, hint, children}: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {marginBottom: SPACING.lg},
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
    alignItems: 'baseline',
    gap: SPACING.sm,
  },
  label: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.body,
    color: COLORS.text,
    lineHeight: 22,
    flexShrink: 1,
  },
  hint: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.small,
    color: COLORS.textSecondary,
    lineHeight: 20,
    fontVariant: ['tabular-nums'],
  },
  error: {
    marginTop: SPACING.xs,
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.small,
    color: COLORS.dangerText,
    lineHeight: 20,
  },
});
