export type TaskPriority = 'low' | 'medium' | 'high';

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

