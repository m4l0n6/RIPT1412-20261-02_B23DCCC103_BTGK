import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TaskProvider} from './src/context/TaskContext';
import {RootStackParamList} from './src/navigation/types';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import {COLORS, FONT_FAMILY} from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TaskList"
            screenOptions={{
              headerStyle: {backgroundColor: COLORS.primary},
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                fontFamily: FONT_FAMILY.display,
                fontSize: 20,
                fontWeight: '400',
              },
              contentStyle: {backgroundColor: COLORS.background},
            }}>
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{title: 'Kế hoạch cá nhân'}}
            />
            <Stack.Screen
              name="TaskForm"
              component={TaskFormScreen}
              options={({route}) => ({
                title: route.params?.id ? 'Sửa công việc' : 'Thêm công việc',
              })}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetailScreen}
              options={{title: 'Chi tiết công việc'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </SafeAreaProvider>
  );
}
