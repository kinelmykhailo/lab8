import type { Task } from '../types/task';

export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'React Components',
    description: 'Опрацювати базові принципи компонентів React та їх композицію',
    completed: false,
    priority: 'high',
    category: 'React',
  },
  {
    id: 2,
    title: 'TypeScript Exercises',
    description: 'Виконати практичні вправи з типізації інтерфейсів та props',
    completed: true,
    priority: 'medium',
    category: 'TypeScript',
  },
  {
    id: 3,
    title: 'JSX Syntax & Expressions',
    description: 'Закріпити роботу з JSX, фігурними дужками та фрагментами',
    completed: false,
    priority: 'medium',
    category: 'React',
  },
  {
    id: 4,
    title: 'Props & Event Handlers',
    description: 'Реалізувати передачу даних між компонентами через props та колбеки',
    completed: true,
    priority: 'high',
    category: 'React',
  },
  {
    id: 5,
    title: 'Підготовка до захисту Лабораторної №8',
    description: 'Повторити відповіді на контрольні запитання та підготувати демонстрацію',
    completed: false,
    priority: 'low',
    category: 'Навчання',
  },
];
