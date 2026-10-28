import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Task, TaskInput} from '../types/task';
import {loadTasks, saveTasks} from '../storage/taskStorage';

interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  getTask: (id: string) => Task | undefined;
  addTask: (input: TaskInput) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleDone: (id: string) => void;
  deleteDone: () => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({children}: {children: React.ReactNode}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Đọc dữ liệu 1 lần khi mở app
  useEffect(() => {
    let mounted = true;
    loadTasks().then(list => {
      if (mounted) {
        setTasks(list);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Mỗi lần danh sách thay đổi thì lưu lại
  useEffect(() => {
    if (!loading) {
      saveTasks(tasks);
    }
  }, [tasks, loading]);

  const getTask = useCallback(
    (id: string) => tasks.find(t => t.id === id),
    [tasks],
  );

  const addTask = useCallback((input: TaskInput) => {
    const task: Task = {...input, id: Date.now().toString(), done: false};
    setTasks(prev => [...prev, task]);
  }, []);

  const updateTask = useCallback((task: Task) => {
    setTasks(prev => prev.map(t => (t.id === task.id ? task : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleDone = useCallback((id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? {...t, done: !t.done} : t)));
  }, []);

  const deleteDone = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.done));
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      getTask,
      addTask,
      updateTask,
      deleteTask,
      toggleDone,
      deleteDone,
    }),
    [tasks, loading, getTask, addTask, updateTask, deleteTask, toggleDone, deleteDone],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTasks phải được dùng bên trong TaskProvider');
  }
  return ctx;
}
