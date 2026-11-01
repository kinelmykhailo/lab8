import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TaskStats } from './components/TaskStats';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { initialTasks } from './data/initialTasks';
import type { Task, TaskFilter, TaskFormData, TaskPriority, TaskSort } from './types/task';

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function App() {
  // 1. Головний стан списку завдань (ініціалізується початковими даними)
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // 2. Стан активного фільтра (всі / невиконані / виконані)
  const [filter, setFilter] = useState<TaskFilter>('all');

  // 3. Стан пошукового запиту
  const [searchTerm, setSearchTerm] = useState('');

  // 4. Стан сортування
  const [sortBy, setSortBy] = useState<TaskSort>('none');

  // 5. Стан теми оформлення (світла / темна)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Синхронізація темної теми з кореневим тегом html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ОБЧИСЛЮВАНИЙ СТАН: Статистика (без окремого useState, згідно з вимогами лаби)
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  // ОБРОБНИКИ ПОДІЙ З НЕЗМІННИМ ОНОВЛЕННЯМ (Immutable updates)
  // Додавання нового завдання
  const handleAddTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now(), // генеруємо унікальний id на основі timestamp
      ...formData,
      completed: false,
    };

    // Незмінне додавання: створюємо новий масив за допомогою spread оператора
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Перемикання стану виконання (виконано / повернути в роботу)
  const handleToggleTask = (id: number) => {
    // Незмінне оновлення: метод .map() повертає новий масив і копіює змінений об'єкт
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Видалення одного завдання
  const handleDeleteTask = (id: number) => {
    // Незмінне видалення: .filter() повертає новий масив без елемента з заданим id
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Видалення всіх виконаних завдань
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // ОБЧИСЛЕННЯ ВІДФІЛЬТРОВАНОГО ТА ВІДСОРТОВАНОГО СПИСКУ
  const filteredAndSortedTasks = tasks
    // Фільтрація за статусом
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true; // 'all'
    })
    // Фільтрація за пошуковим рядком (назва або категорія)
    .filter((task) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(term) ||
        task.category.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    })
    // Сортування (копіюємо масив перед сортуванням для чистоти даних)
    .slice()
    .sort((a, b) => {
      if (sortBy === 'priority-desc') {
        return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
      }
      if (sortBy === 'priority-asc') {
        return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title, 'uk');
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Блок статистики завдань */}
        <TaskStats
          total={totalCount}
          completed={completedCount}
          active={activeCount}
        />

        {/* Форма додавання нового завдання */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Фільтрація, пошук та сортування */}
        <TaskFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={{
            all: totalCount,
            completed: completedCount,
            active: activeCount,
          }}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearCompleted={handleClearCompleted}
        />

        {/* Список завдань з умовним рендерингом */}
        <section aria-label="Список завдань">
          <TaskList
            tasks={filteredAndSortedTasks}
            totalTasksCount={totalCount}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>

      <footer className="py-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500">
        Study Planner • Лабораторна робота №8 • React 19 + TypeScript + Vite
      </footer>
    </div>
  );
}

export default App;
