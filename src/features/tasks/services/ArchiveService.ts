// Temporary in-memory ArchiveService
// Replace with SQLite later

let archived: number[] = [];

const ArchiveService = {
  archiveTasks: async (ids: number[]): Promise<void> => {
    archived = [...archived, ...ids];
  },

  getArchived: async (): Promise<number[]> => {
    return [...archived];
  },
};

export default ArchiveService;
