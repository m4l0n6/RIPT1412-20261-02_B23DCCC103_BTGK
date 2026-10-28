import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/types';
import {useTasks} from '../context/TaskContext';
import {dueText, isOverdue} from '../utils/date';
import Badge from '../components/Badge';
import AppButton from '../components/AppButton';
import {
  CARD_SHADOW,
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  PRIORITY_COLORS,
  RADIUS,
  SPACING,
} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

function InfoRow({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      {children}
    </View>
  );
}

export default function TaskDetailScreen({route, navigation}: Props) {
  const {getTask, toggleDone} = useTasks();
  const task = getTask(route.params.id);

  // Công việc đã bị xoá -> không vẽ gì để tránh crash
  if (!task) {
    return null;
  }

  const overdue = isOverdue(task);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={[styles.title, task.done && styles.titleDone]}>
            {task.title}
          </Text>

          <View style={styles.badges}>
            <Badge
              label={task.priority}
              color={PRIORITY_COLORS[task.priority]}
            />
            {overdue ? (
              <Badge label="Quá hạn" color={COLORS.danger} filled />
            ) : null}
            {task.done ? (
              <Badge label="Đã hoàn thành" color={COLORS.success} filled />
            ) : null}
          </View>

          <InfoRow label="Danh mục">
            <Text style={styles.rowValue}>{task.category}</Text>
          </InfoRow>
          <InfoRow label="Hạn hoàn thành">
            <Text style={styles.rowValue}>{task.dueDate}</Text>
          </InfoRow>
          <InfoRow label="Thời gian còn lại">
            <Text style={[styles.rowValue, overdue && styles.overdueText]}>
              {dueText(task.dueDate)}
            </Text>
          </InfoRow>
          <InfoRow label="Trạng thái">
            <Text style={styles.rowValue}>
              {task.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </Text>
          </InfoRow>
          <InfoRow label="Ghi chú">
            <Text style={styles.rowValue}>
              {task.note ? task.note : 'Không có ghi chú'}
            </Text>
          </InfoRow>
        </View>

        <AppButton
          title="Sửa"
          variant="outline"
          style={styles.btn}
          onPress={() => navigation.navigate('TaskForm', {id: task.id})}
        />
        <AppButton
          title={
            task.done ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'
          }
          style={styles.btn}
          onPress={() => toggleDone(task.id)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: COLORS.background},
  content: {padding: SPACING.lg, paddingBottom: SPACING.xl},
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 0,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...CARD_SHADOW,
  },
  title: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 24,
    color: COLORS.text,
    lineHeight: 30,
    letterSpacing: -0.4,
    marginBottom: SPACING.lg,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  row: {
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.track,
  },
  rowLabel: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    lineHeight: 20,
  },
  rowValue: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.title,
    color: COLORS.text,
    lineHeight: 24,
  },
  overdueText: {
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.dangerText,
  },
  btn: {marginTop: SPACING.sm},
});
