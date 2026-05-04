export const STATUS_ORDER = ['todo', 'in-progress', 'review', 'done'];

export const STATUS_LABELS = {
  'todo': 'Todo',
  'in-progress': 'In Progress',
  'review': 'Review',
  'done': 'Done',
};

export function getNextStatus(status) {
  const index = STATUS_ORDER.indexOf(status);
  if (index === -1 || index === STATUS_ORDER.length - 1) return null;
  return STATUS_ORDER[index + 1];
}

export function getPrevStatus(status) {
  const index = STATUS_ORDER.indexOf(status);
  if (index <= 0) return null;
  return STATUS_ORDER[index - 1];
}
