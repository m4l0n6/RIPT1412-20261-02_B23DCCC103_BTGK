export type RootStackParamList = {
  TaskList: undefined;
  TaskForm: {id?: string} | undefined; // có id = sửa, không có = thêm
  TaskDetail: {id: string};
};
