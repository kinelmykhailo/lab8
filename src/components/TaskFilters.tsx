import React from 'react';
import { Search, Filter, ArrowUpDown, Trash2, X } from 'lucide-react';
import type { TaskFilter, TaskSort } from '../types/task';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  counts: {
    all: number;
    completed: number;
    active: number;
  };
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: TaskSort;
  onSortChange: (value: TaskSort) => void;
  onClearCompleted: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  currentFilter,
  onFilterChange,
  counts,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onClearCompleted,
}) => {
  const filterButtons: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Всі', count: counts.all },
    { key: 'active', label: 'Не виконані', count: counts.active },
    { key: 'completed', label: 'Виконані', count: counts.completed },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
      {/* Top row: Search and Sort controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input (Bonus #1) */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Пошук завдань за назвою або категорією..."
            className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-slate-800 dark:text-slate-100 text-sm transition-colors outline-hidden"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              title="Очистити пошук"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select (Bonus #2) */}
        <div className="relative sm:w-56">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 text-sm">
            <ArrowUpDown className="w-4 h-4 text-indigo-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as TaskSort)}
              aria-label="Сортування завдань"
              className="w-full bg-transparent border-none outline-hidden cursor-pointer text-xs sm:text-sm font-medium"
            >
              <option value="none" className="bg-white dark:bg-slate-900">Без сортування</option>
              <option value="priority-desc" className="bg-white dark:bg-slate-900">Пріоритет (від високого)</option>
              <option value="priority-asc" className="bg-white dark:bg-slate-900">Пріоритет (від низького)</option>
              <option value="title" className="bg-white dark:bg-slate-900">За назвою (А-Я)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom row: Filter Buttons & Clear Completed */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Фільтр:
          </span>
          {filterButtons.map((btn) => {
            const isActive = currentFilter === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => onFilterChange(btn.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{btn.label}</span>
                {/* Counter inside filter button (Bonus #3) */}
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clear Completed Button (Bonus #4) */}
        {counts.completed > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer ml-auto"
            title="Видалити всі виконані завдання"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Очистити виконані ({counts.completed})
          </button>
        )}
      </div>
    </div>
  );
};
