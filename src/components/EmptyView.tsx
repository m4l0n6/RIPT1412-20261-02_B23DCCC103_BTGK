import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_FAMILY, FONT_SIZE, SPACING} from '../theme/colors';

export default function EmptyView({message}: {message: string}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>📋</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    maxWidth: 340,
    alignSelf: 'center',
  },
  icon: {
    display: 'none',
  },
  text: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 23,
  },
});
