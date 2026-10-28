import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/types';
import {useTasks} from '../context/TaskContext';
import {CATEGORIES, Category, PRIORITIES, Priority} from '../types/task';
import {formatDate, formatDateInput, parseDate, startOfToday} from '../utils/date';
import FormField from '../components/FormField';
import ChipGroup from '../components/ChipGroup';
import AppButton from '../components/AppButton';
import {COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;

interface Errors {
  title?: string;
  dueDate?: string;
}

const MAX_TITLE = 50;

export default function TaskFormScreen({route, navigation}: Props) {
  const id = route.params?.id;
  const {getTask, addTask, updateTask} = useTasks();
  const existing = id ? getTask(id) : undefined;
  const isEdit = existing !== undefined;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [category, setCategory] = useState<Category>(
    existing?.category ?? 'Học tập',
  );
  const [priority, setPriority] = useState<Priority>(
    existing?.priority ?? 'Trung bình',
  );
  const [dueDate, setDueDate] = useState(
    existing?.dueDate ?? formatDate(startOfToday()),
  );
  const [errors, setErrors] = useState<Errors>({});

  // Công việc không còn tồn tại (đã bị xoá) -> không vẽ gì để tránh crash
  if (id && !existing) {
    return null;
  }

  const validate = (): Errors => {
    const e: Errors = {};
    const t = title.trim();
    if (!t) {
      e.title = 'Tên công việc không được để trống';
    } else if (t.length > MAX_TITLE) {
      e.title = `Tên công việc tối đa ${MAX_TITLE} ký tự`;
    }

    const due = parseDate(dueDate);
    if (!due) {
      e.dueDate = 'Hạn phải đúng định dạng dd/mm/yyyy và là ngày có thật';
    } else if (!isEdit && due.getTime() < startOfToday().getTime()) {
      e.dueDate = 'Hạn hoàn thành không được trước ngày hôm nay';
    }
    return e;
  };

  const handleSave = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      return;
    }
    const data = {
      title: title.trim(),
      note: note.trim(),
      category,
      priority,
      dueDate,
    };
    if (existing) {
      updateTask({...existing, ...data});
    } else {
      addTask(data);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <FormField
            label="Tên công việc"
            error={errors.title}
            hint={`${title.trim().length}/${MAX_TITLE}`}>
            <TextInput
              style={[styles.input, errors.title ? styles.inputError : null]}
              value={title}
              onChangeText={v => {
                setTitle(v);
                setErrors(prev => ({...prev, title: undefined}));
              }}
              placeholder="Ví dụ: Nộp báo cáo"
              placeholderTextColor={COLORS.disabled}
            />
          </FormField>

          <FormField label="Ghi chú (không bắt buộc)">
            <TextInput
              style={[styles.input, styles.noteInput]}
              value={note}
              onChangeText={setNote}
              placeholder="Thêm ghi chú..."
              placeholderTextColor={COLORS.disabled}
              multiline
              textAlignVertical="top"
            />
          </FormField>

          <FormField label="Danh mục">
            <ChipGroup
              options={CATEGORIES}
              value={category}
              onChange={setCategory}
            />
          </FormField>

          <FormField label="Mức ưu tiên">
            <ChipGroup
              options={PRIORITIES}
              value={priority}
              onChange={setPriority}
            />
          </FormField>

          <FormField label="Hạn hoàn thành" error={errors.dueDate}>
            <TextInput
              style={[styles.input, errors.dueDate ? styles.inputError : null]}
              value={dueDate}
              onChangeText={v => {
                setDueDate(formatDateInput(v));
                setErrors(prev => ({...prev, dueDate: undefined}));
              }}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.disabled}
              keyboardType="number-pad"
              maxLength={10}
            />
          </FormField>

          <View style={styles.actions}>
            <AppButton
              title={isEdit ? 'Lưu thay đổi' : 'Thêm công việc'}
              onPress={handleSave}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: COLORS.background},
  flex: {flex: 1},
  content: {padding: SPACING.lg, paddingBottom: SPACING.xl},
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.title,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    lineHeight: 23,
  },
  inputError: {borderColor: COLORS.dangerText},
  noteInput: {minHeight: 88},
  actions: {marginTop: SPACING.xs},
});
