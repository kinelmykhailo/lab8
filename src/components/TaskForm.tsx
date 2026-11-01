import React, { useState } from 'react';
import { PlusCircle, AlertCircle, Tag, Flag, AlignLeft, Type } from 'lucide-react';
import type { TaskFormData, TaskPriority } from '../types/task';

interface TaskFormProps {
  onAddTask: (data: TaskFormData) => void;
}

const CATEGORY_SUGGESTIONS = ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Навчання', 'Проєкт'];

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('React');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Назва завдання є обовʼязковою!');
      return;
    }

    onAddTask({
      title: trimmedTitle,
      description: description.trim(),
      category: category.trim() || 'Загальне',
      priority,
    });

    // Очищення форми після успішного додавання
    setTitle('');
    setDescription('');
    setCategory('React');
    setPriority('medium');
    setError(null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
        <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        Додати нове завдання
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label
            htmlFor="task-title"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"
          >
            <Type className="w-3.5 h-3.5 text-indigo-500" />
            Назва завдання <span className="text-rose-500">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Наприклад: Вивчити React Hooks..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors outline-hidden focus:ring-2 ${
              error
                ? 'border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 focus:ring-rose-400 focus:border-rose-400'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 focus:ring-indigo-400 focus:border-indigo-400 text-slate-800 dark:text-slate-100'
            }`}
          />
          {error && (
            <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {error}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="task-desc"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"
          >
            <AlignLeft className="w-3.5 h-3.5 text-indigo-500" />
            Опис завдання
          </label>
          <textarea
            id="task-desc"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Короткі примітки або опис що потрібно зробити..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-slate-800 dark:text-slate-100 text-sm transition-colors outline-hidden resize-none"
          />
        </div>

        {/* Category & Priority in responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category Field */}
          <div>
            <label
              htmlFor="task-category"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"
            >
              <Tag className="w-3.5 h-3.5 text-indigo-500" />
              Категорія
            </label>
            <div className="space-y-2">
              <input
                id="task-category"
                type="text"
                list="category-presets"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Введіть або виберіть категорію"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-slate-800 dark:text-slate-100 text-sm transition-colors outline-hidden"
              />
              <datalist id="category-presets">
                {CATEGORY_SUGGESTIONS.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>

              {/* Quick suggestion pills */}
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_SUGGESTIONS.slice(0, 4).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`text-xs px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                      category === cat
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-200 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Priority Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-indigo-500" />
              Пріоритет
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { value: 'low', label: 'Низький', activeClass: 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' },
                  { value: 'medium', label: 'Середній', activeClass: 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' },
                  { value: 'high', label: 'Високий', activeClass: 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' },
                ] as const
              ).map((p) => {
                const isSelected = priority === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? `${p.activeClass} font-semibold ring-1 ring-offset-0 shadow-xs`
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium text-sm shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Додати завдання
          </button>
        </div>
      </form>
    </section>
  );
};
