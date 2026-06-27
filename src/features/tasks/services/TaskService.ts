// Temporary in-memory TaskService
// Replace with SQLite later

import { Task } from '@tasks/types/Task';

let tasks: Task[] = [];

const TaskService = {
  getAllTasks: async (): Promise<Task[]> => {
    return [...tasks];
  },

  addTask: async (task: Task): Promise<void> => {
    tasks.push(task);
  },

  updateTask: async (
    id: number,
    updates: Partial<Task>
  ): Promise<void> => {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
  },

  deleteTask: async (id: number): Promise<void> => {
    tasks = tasks.filter((t) => t.id !== id);
  },

  toggleComplete: async (id: number): Promise<void> => {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
  },
};

export default TaskService;
