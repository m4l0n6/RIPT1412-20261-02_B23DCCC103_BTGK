import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Task} from '../types/task';
import {isOverdue} from '../utils/date';
import {
  CARD_SHADOW,
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  PRIORITY_COLORS,
  RADIUS,
  SPACING,
} from '../theme/colors';
import Badge from './Badge';

interface Props {
  task: Task;
  onPress: () => void;
  onLongPress: () => void;
  onToggle: () => void;
}

export default function TaskCard({task, onPress, onLongPress, onToggle}: Props) {
  const overdue = isOverdue(task);
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <Pressable
        onPress={onToggle}
        hitSlop={10}
        style={[styles.checkbox, task.done && styles.checkboxDone]}>
        {task.done ? <Text style={styles.tick}>✓</Text> : null}
      </Pressable>

      <View style={[styles.body, task.done && styles.bodyDone]}>
        <Text
          numberOfLines={2}
          style={[styles.title, task.done && styles.titleDone]}>
          {task.title}
        </Text>
        <Text style={styles.meta}>
          {task.category} • Hạn {task.dueDate}
        </Text>
        <View style={styles.badges}>
          <Badge label={task.priority} color={PRIORITY_COLORS[task.priority]} />
          {overdue ? (
            <Badge label="Quá hạn" color={COLORS.danger} filled />
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginVertical: 6,
    ...CARD_SHADOW,
  },
  pressed: {opacity: 0.75},
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.lg,
  },
  checkboxDone: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  tick: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '400',
  },
  body: {flex: 1, gap: SPACING.sm},
  bodyDone: {opacity: 0.85},
  title: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.title,
    color: COLORS.text,
    lineHeight: 22,
  },
  titleDone: {
    textDecorationLine: 'line-through',
  },
  meta: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.small,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
