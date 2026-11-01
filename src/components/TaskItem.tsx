import React from 'react';
import { Check, Trash2, Tag, Flag } from 'lucide-react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const PRIORITY_CONFIG = {
  high: {
    label: 'Високий',
    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900',
    iconColor: 'text-rose-500',
  },
  medium: {
    label: 'Середній',
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
    iconColor: 'text-amber-500',
  },
  low: {
    label: 'Низький',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
    iconColor: 'text-emerald-500',
  },
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const priorityInfo = PRIORITY_CONFIG[task.priority];

  return (
    <li
      className={`group relative rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
        task.completed
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-75'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-slate-700 shadow-xs hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Toggle Complete Checkbox */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Позначити як невиконане' : 'Позначити як виконане'}
          className={`mt-0.5 shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-transparent'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onToggle(task.id)}
              className={`text-base font-semibold leading-snug cursor-pointer transition-colors ${
                task.completed
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {task.title}
            </h3>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              aria-label={`Видалити завдання ${task.title}`}
              title="Видалити завдання"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Description (if provided) */}
          {task.description && (
            <p
              className={`mt-1 text-sm line-clamp-3 ${
                task.completed
                  ? 'text-slate-400 dark:text-slate-500'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Badges footer: Category & Priority */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Category badge */}
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60">
              <Tag className="w-3 h-3" />
              {task.category}
            </span>

            {/* Priority badge */}
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-lg border ${priorityInfo.badge}`}
            >
              <Flag className={`w-3 h-3 ${priorityInfo.iconColor}`} />
              {priorityInfo.label}
            </span>

            {/* Completion status indicator tag */}
            {task.completed ? (
              <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ Виконано
              </span>
            ) : (
              <span className="inline-flex items-center text-[11px] font-medium text-slate-400 dark:text-slate-500">
                ○ В роботі
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
