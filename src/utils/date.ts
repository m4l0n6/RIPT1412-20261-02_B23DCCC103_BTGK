export const startOfToday = (): Date => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

// Trả về Date nếu hợp lệ, null nếu sai (ví dụ 31/02/2026 -> null)
export const parseDate = (s: string): Date | null => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s.trim());
  if (!m) {
    return null;
  }
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const date = new Date(year, month - 1, day);
  const valid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
  return valid ? date : null;
};

export const formatDate = (d: Date): string =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(
    2,
    '0',
  )}/${d.getFullYear()}`;

// Chỉ giữ số, tự chèn dấu "/" -> gõ liền 8 số là ra dd/mm/yyyy
export const formatDateInput = (text: string): string => {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

// > 0: còn; 0: hôm nay; < 0: quá hạn
export const daysLeft = (dueDate: string): number => {
  const due = parseDate(dueDate);
  if (!due) {
    return 0;
  }
  return Math.round((due.getTime() - startOfToday().getTime()) / 86400000);
};

export const isOverdue = (t: {done: boolean; dueDate: string}): boolean =>
  !t.done && daysLeft(t.dueDate) < 0;

export const dueText = (dueDate: string): string => {
  const n = daysLeft(dueDate);
  if (n > 0) {
    return `Còn ${n} ngày`;
  }
  if (n === 0) {
    return 'Hạn hôm nay';
  }
  return `Quá hạn ${-n} ngày`;
};
