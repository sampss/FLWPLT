export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  completeBy?: string;
}



/* Heavily commented code explaining in detail

// Defines the shape of a task object across your entire app.
// This interface helps with strong typing and consistency.

export interface Task {
  // Unique numeric ID for the task (assigned manually or by SQLite AUTOINCREMENT)
  id: number;

  // The textual content of the task (e.g., "Buy groceries")
  title: string;

  // Boolean representing whether the task is completed (used for toggling status)
  completed: boolean;

  // ISO timestamp string representing when the task was created (for sorting/filtering)
  createdAt: string;

  // Optional ISO date string for due date
  completeBy?: string; 
}

*/