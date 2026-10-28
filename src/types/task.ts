export const CATEGORIES = ['Học tập', 'Công việc', 'Sức khoẻ', 'Cá nhân'] as const;
export const PRIORITIES = ['Cao', 'Trung bình', 'Thấp'] as const;

export type Category = (typeof CATEGORIES)[number];
export type Priority = (typeof PRIORITIES)[number];

export interface Task {
  id: string;
  title: string;
  note: string;
  category: Category;
  priority: Priority;
  dueDate: string; // dd/mm/yyyy
  done: boolean;
}

export type TaskInput = Omit<Task, 'id' | 'done'>;
