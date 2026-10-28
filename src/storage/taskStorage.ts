import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../types/task';
import {formatDate, startOfToday} from '../utils/date';

const KEY = 'PLANNER_TASKS';

// Ngày mẫu tính từ hôm nay để luôn có việc quá hạn / chưa quá hạn
const addDays = (n: number): string => {
  const d = startOfToday();
  d.setDate(d.getDate() + n);
  return formatDate(d);
};

export const buildSeed = (): Task[] => [
  {
    id: 'seed-1',
    title: 'Làm bài tập React Native',
    note: 'Hoàn thành các câu 1-4',
    category: 'Học tập',
    priority: 'Cao',
    dueDate: addDays(2),
    done: false,
  },
  {
    id: 'seed-2',
    title: 'Nộp báo cáo môn Di động',
    note: 'Gửi file PDF cho giảng viên',
    category: 'Học tập',
    priority: 'Cao',
    dueDate: addDays(-2),
    done: false,
  },
  {
    id: 'seed-3',
    title: 'Họp nhóm đồ án',
    note: '',
    category: 'Công việc',
    priority: 'Trung bình',
    dueDate: addDays(0),
    done: false,
  },
  {
    id: 'seed-4',
    title: 'Chạy bộ 30 phút',
    note: 'Công viên gần nhà',
    category: 'Sức khoẻ',
    priority: 'Thấp',
    dueDate: addDays(1),
    done: false,
  },
  {
    id: 'seed-5',
    title: 'Mua quà sinh nhật bạn',
    note: '',
    category: 'Cá nhân',
    priority: 'Trung bình',
    dueDate: addDays(5),
    done: false,
  },
  {
    id: 'seed-6',
    title: 'Đọc xong chương 3 giáo trình',
    note: '',
    category: 'Học tập',
    priority: 'Thấp',
    dueDate: addDays(-3),
    done: true,
  },
  {
    id: 'seed-7',
    title: 'Dọn dẹp phòng',
    note: 'Sắp xếp lại bàn học',
    category: 'Cá nhân',
    priority: 'Thấp',
    dueDate: addDays(-5),
    done: false,
  },
];

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Không lưu được dữ liệu', e);
  }
}

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed as Task[];
      }
    }
  } catch (e) {
    console.warn('Không đọc được dữ liệu', e);
  }
  // Lần chạy đầu tiên (hoặc dữ liệu hỏng): khởi tạo dữ liệu mẫu
  const seed = buildSeed();
  await saveTasks(seed);
  return seed;
}
