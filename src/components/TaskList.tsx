import React from 'react';
import { ClipboardList, SearchX } from 'lucide-react';
import type { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  totalTasksCount: number;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  totalTasksCount,
  onToggleTask,
  onDeleteTask,
}) => {
  // Умовний рендеринг: коли в застосунку взагалі немає жодного завдання
  if (totalTasksCount === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 border border-slate-200 dark:border-slate-800 text-center shadow-xs transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 mx-auto flex items-center justify-center mb-3">
          <ClipboardList className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
          Завдань поки немає
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Додайте перше навчальне завдання за допомогою форми вище, щоб розпочати планування.
        </p>
      </div>
    );
  }

  // Умовний рендеринг: коли завдання є, але під поточний фільтр / пошук нічого не підходить
  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 border border-slate-200 dark:border-slate-800 text-center shadow-xs transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
          За цим фільтром завдань немає
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Спробуйте змінити активний фільтр або скинути пошуковий запит.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  );
};
