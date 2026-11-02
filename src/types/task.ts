export type TaskPriority = 'low' | 'medium' | 'high';

export interface PriorityInfo {
  value: TaskPriority;
  label: string;
  weight: number;
  badgeClass: string;
  buttonClass: string;
  iconColor: string;
}

export const PRIORITY_CONFIG: Record<TaskPriority, PriorityInfo> = {
  low: {
    value: 'low',
    label: 'Низький',
    weight: 1,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
    buttonClass: 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold ring-1 ring-offset-0 shadow-xs',
    iconColor: 'text-emerald-500',
  },
  medium: {
    value: 'medium',
    label: 'Середній',
    weight: 2,
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
    buttonClass: 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-semibold ring-1 ring-offset-0 shadow-xs',
    iconColor: 'text-amber-500',
  },
  high: {
    value: 'high',
    label: 'Високий',
    weight: 3,
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900',
    buttonClass: 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-semibold ring-1 ring-offset-0 shadow-xs',
    iconColor: 'text-rose-500',
  },
};

export type TaskFilter = 'all' | 'completed' | 'active';

export type TaskSort = 'none' | 'priority-desc' | 'priority-asc' | 'title';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  category: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
}
