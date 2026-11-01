import React from 'react';
import { ListTodo, CheckCircle, Clock, Award } from 'lucide-react';

interface TaskStatsProps {
  total: number;
  completed: number;
  active: number;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ total, completed, active }) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-500" />
          Прогрес навчання
        </h2>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Виконано: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{percent}%</strong>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Всього</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{total}</div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Виконано</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{completed}</div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">В роботі</div>
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{active}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
