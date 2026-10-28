import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from '../navigation/types';
import {useTasks} from '../context/TaskContext';
import {Priority, Task} from '../types/task';
import {isOverdue, parseDate} from '../utils/date';
import TaskCard from '../components/TaskCard';
import ProgressBar from '../components/ProgressBar';
import SegmentedControl from '../components/SegmentedControl';
import EmptyView from '../components/EmptyView';
import AppButton from '../components/AppButton';
import {
  CARD_SHADOW,
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const STATUS_OPTIONS = ['Tất cả', 'Chưa xong', 'Đã xong', 'Quá hạn'] as const;
const SORT_OPTIONS = ['Hạn gần nhất', 'Ưu tiên'] as const;
type Status = (typeof STATUS_OPTIONS)[number];
type SortBy = 'date' | 'priority';

const PRIORITY_ORDER: Record<Priority, number> = {
  Cao: 0,
  'Trung bình': 1,
  Thấp: 2,
};

const timeOf = (t: Task): number => parseDate(t.dueDate)?.getTime() ?? 0;

const matchStatus = (t: Task, status: Status): boolean => {
  switch (status) {
    case 'Chưa xong':
      return !t.done;
    case 'Đã xong':
      return t.done;
    case 'Quá hạn':
      return isOverdue(t);
    default:
      return true;
  }
};

export default function TaskListScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {tasks, loading, toggleDone, deleteTask, deleteDone} = useTasks();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('Tất cả');
  const [sortBy, setSortBy] = useState<SortBy>('date');

  const doneCount = useMemo(() => tasks.filter(t => t.done).length, [tasks]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = tasks.filter(
      t => t.title.toLowerCase().includes(q) && matchStatus(t, status),
    );
    return list.sort((a, b) => {
      if (sortBy === 'date') {
        return timeOf(a) - timeOf(b);
      }
      const diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      return diff !== 0 ? diff : timeOf(a) - timeOf(b);
    });
  }, [tasks, query, status, sortBy]);

  const confirmDelete = (task: Task) => {
    Alert.alert('Xoá công việc', `Bạn có chắc muốn xoá "${task.title}"?`, [
      {text: 'Huỷ', style: 'cancel'},
      {text: 'Xoá', style: 'destructive', onPress: () => deleteTask(task.id)},
    ]);
  };

  const confirmDeleteDone = () => {
    Alert.alert(
      'Xoá việc đã hoàn thành',
      `Sẽ xoá ${doneCount} việc đã hoàn thành. Bạn có chắc không?`,
      [
        {text: 'Huỷ', style: 'cancel'},
        {text: 'Xoá', style: 'destructive', onPress: deleteDone},
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.text} />
      </View>
    );
  }

  const emptyMessage =
    tasks.length === 0
      ? 'Chưa có công việc nào. Nhấn "+ Thêm việc" để bắt đầu.'
      : 'Không có công việc phù hợp với bộ lọc hoặc từ khoá.';

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.panel}>
        <ProgressBar done={doneCount} total={tasks.length} />

        <View style={styles.searchRow}>
          <MaterialIcons
            name="search"
            size={20}
            color={COLORS.textSecondary}
            accessible={false}
          />
          <TextInput
            style={styles.search}
            value={query}
            onChangeText={setQuery}
            accessibilityLabel="Tìm theo tên công việc"
            placeholder="Tìm theo tên công việc..."
            placeholderTextColor={COLORS.disabled}
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.filterContent}
          style={styles.filters}>
          <SegmentedControl
            options={STATUS_OPTIONS}
            value={status}
            onChange={setStatus}
          />
        </ScrollView>

        <SegmentedControl
          options={SORT_OPTIONS}
          value={sortBy === 'date' ? 'Hạn gần nhất' : 'Ưu tiên'}
          onChange={value =>
            setSortBy(value === 'Hạn gần nhất' ? 'date' : 'priority')
          }
        />
      </View>

      <View style={styles.listActions}>
        <AppButton
          title={`Xoá việc đã hoàn thành (${doneCount})`}
          variant="outline"
          disabled={doneCount === 0}
          onPress={confirmDeleteDone}
        />
      </View>

      <FlatList
        style={styles.list}
        data={shown}
        keyExtractor={t => t.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.listContent,
          {paddingBottom: 88 + insets.bottom},
          shown.length === 0 && styles.emptyContainer,
        ]}
        ListEmptyComponent={<EmptyView message={emptyMessage} />}
        renderItem={({item}) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('TaskDetail', {id: item.id})}
            onLongPress={() => confirmDelete(item)}
            onToggle={() => toggleDone(item.id)}
          />
        )}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Thêm công việc"
        onPress={() => navigation.navigate('TaskForm')}
        style={({pressed}) => [
          styles.fab,
          {bottom: SPACING.lg + insets.bottom, right: SPACING.lg + insets.right},
          pressed && styles.pressed,
        ]}>
        <Text style={styles.fabText}>+ Thêm việc</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.background},
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  panel: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    minHeight: 44,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    marginVertical: SPACING.sm,
  },
  search: {
    flex: 1,
    minWidth: 0,
    minHeight: 44,
    paddingVertical: SPACING.sm,
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.body,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  filters: {flexGrow: 0, marginBottom: SPACING.sm},
  filterContent: {flexGrow: 1},
  pressed: {opacity: 0.6},
  list: {flex: 1},
  listContent: {paddingTop: SPACING.xs},
  emptyContainer: {flexGrow: 1, justifyContent: 'center'},
  listActions: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  fab: {
    position: 'absolute',
    minHeight: 48,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...CARD_SHADOW,
  },
  fabText: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.body,
    lineHeight: 20,
    color: COLORS.primary,
  },
});
