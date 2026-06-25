/**
 * Mock archive writer for development
 * Logs archived items instead of saving them
 */
export const mockArchiveWrite = async (archivedItems: any[]): Promise<void> => {
  console.log('[MockArchiveWrite] Archived items:', archivedItems);
};

type ArchiveContext = {
  appId: string;
  archiveType?: string;
  timestamp?: number;
};

/**
 * Archive all completed tasks
 */
export const archiveCompletedTasks = async (
  tasks: any[],
  dbWrite: (archived: any[]) => Promise<void>,
  context: ArchiveContext = { appId: 'FlowPilot' }
): Promise<void> => {
  const timestamp = Date.now();

  const archivedItems = tasks
    .filter(t => t.completed)
    .map(t => ({
      ...t,
      archivedAt: timestamp,
      archiveSource: context.appId || 'unknown',
    }));

  await dbWrite(archivedItems);
};

/**
 * Archive tasks older than X days
 */
export const archiveOldTasks = async (
  tasks: any[],
  daysOld: number,
  dbWrite: (archived: any[]) => Promise<void>,
  context: ArchiveContext = { appId: 'FlowPilot' }
): Promise<void> => {
  const cutoff = Date.now() - daysOld * 24 * 60 * 60 * 1000;

  const archivedItems = tasks
    .filter(t => new Date(t.createdAt).getTime() < cutoff)
    .map(t => ({
      ...t,
      archivedAt: Date.now(),
      archiveSource: context.appId,
    }));

  await dbWrite(archivedItems);
};
