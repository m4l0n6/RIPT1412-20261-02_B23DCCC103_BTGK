import {Platform, ViewStyle} from 'react-native';

export const COLORS = {
  primary: '#1E1E1E',
  primaryLight: '#292929',
  background: '#1E1E1E',
  card: '#282828',
  white: '#FFFFFF',

  text: '#F5F5F3', // thông tin chính
  textSecondary: '#B5B5B2', // thông tin phụ
  border: '#484848',

  danger: '#C83F49', // Quá hạn, nút xoá
  dangerText: '#FF7B83', // Chữ và viền lỗi trên nền tối
  warning: '#F2CE66', // ưu tiên Trung bình
  success: '#75CEA0', // ưu tiên Thấp, tiến độ
  disabled: '#949491',
  disabledBg: '#2A2A2A',
  track: '#414141', // nền thanh tiến độ
};

export const PRIORITY_COLORS: Record<string, string> = {
  Cao: COLORS.dangerText,
  'Trung bình': COLORS.warning,
  Thấp: COLORS.success,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const FONT_SIZE = {
  small: 13,
  body: 14,
  title: 16,
  heading: 20,
};

export const FONT_FAMILY = {
  display: 'Gambetta-Regular',
  body: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

export const RADIUS = {
  sm: 12,
  md: 16,
  pill: 999,
};

// Đổ bóng: elevation (Android) + shadow* (iOS)
export const CARD_SHADOW: ViewStyle = Platform.select({
  android: {elevation: 3, shadowColor: '#000000'},
  ios: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },
  default: {},
}) as ViewStyle;
