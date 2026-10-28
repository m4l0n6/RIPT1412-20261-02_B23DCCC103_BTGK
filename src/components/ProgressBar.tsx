import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING} from '../theme/colors';

interface Props {
  done: number;
  total: number;
}

export default function ProgressBar({done, total}: Props) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>
          Đã hoàn thành {done}/{total} công việc
        </Text>
        <Text style={styles.percent}>{percent}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, {width: `${percent}%`}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  label: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.body,
    color: COLORS.text,
    lineHeight: 21,
    flex: 1,
  },
  percent: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.title,
    color: COLORS.text,
    fontVariant: ['tabular-nums'],
  },
  track: {
    height: 2,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.track,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.text,
  },
});
