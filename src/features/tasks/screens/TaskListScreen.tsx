import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';

import AppHeader from '@shared_components/AppHeader';
import ArchiveButton from '@shared_components/ArchiveButton';

import TaskCard from '@task_components/TaskCard';
import TaskService from '@tasks/services/TaskService';
import ArchiveService from '@tasks/services/ArchiveService';
import { Task } from '@typesafe/Task';



const TasksScreen: React.FC = () => {
  const { colors } = useTheme();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [addMode, setAddMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDueAt, setNewDueAt] = useState<string | undefined>(undefined);
  const [showAddDatePicker, setShowAddDatePicker] = useState(false);

  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [showFilterPicker, setShowFilterPicker] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [selectedForArchive, setSelectedForArchive] = useState<number[]>([]);

  /* ---------------------- LOAD TASKS ---------------------- */
  const loadTasks = async () => {
    const all = await TaskService.getAllTasks();
    setTasks(all);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  /* ---------------------- ADD TASK ---------------------- */
  const handleAddTask = async () => {
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      notes: '',
      isCompleted: false,
      dueAt: newDueAt,
      createdAt: new Date().toISOString(), // in-memory only
    };

    await TaskService.addTask(newTask);
    setNewTitle('');
    setNewDueAt(undefined);
    setAddMode(false);
    loadTasks();
  };

  /* ---------------------- DELETE TASK ---------------------- */
  const confirmDelete = async () => {
    if (deleteId !== null) {
      await TaskService.deleteTask(deleteId);
      setDeleteId(null);
      loadTasks();
    }
  };

  /* ---------------------- UPDATE DETAILS ---------------------- */
  const handleUpdateDetails = async (
    id: number,
    notes: string,
    dueAt?: string,
    title?: string
  ) => {
    await TaskService.updateTask(id, { notes, dueAt, title });
    loadTasks();
  };

  /* ---------------------- TOGGLE COMPLETE ---------------------- */
  const handleToggleComplete = async (id: number) => {
    await TaskService.toggleComplete(id);
    loadTasks();
  };

  /* ---------------------- ARCHIVE ---------------------- */
  const handleArchive = async () => {
    if (selectedForArchive.length === 0) return;

    await ArchiveService.archiveTasks(selectedForArchive);
    setSelectedForArchive([]);
    loadTasks();
  };

  /* ---------------------- FILTERED TASKS ---------------------- */
  const filteredTasks = tasks.filter((t) => {
    if (searchMode && searchText.trim()) {
      return t.title.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterDate) {
      return t.dueAt && t.dueAt.startsWith(filterDate);
    }
    return true;
  });

  /* ---------------------- RENDER ---------------------- */
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* HEADER ROW */}
      <AppHeader title="Tasks" rightElement={<ArchiveButton onPress={handleArchive} />} />

      {/* SEARCH / ADD TOGGLE */}
      <View style={styles.inputRow}>
        <Pressable
          onPress={() => {
            setSearchMode(true);
            setAddMode(false);
          }}
          style={[styles.iconButton, searchMode && styles.activeIcon]}
        >
          <Text style={{ fontSize: 20 }}>🔍</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setAddMode(true);
            setSearchMode(false);
          }}
          style={[styles.iconButton, addMode && styles.activeIcon]}
        >
          <Text style={{ fontSize: 20 }}>➕</Text>
        </Pressable>
      </View>

      {/* SEARCH MODE */}
      {searchMode && (
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search tasks..."
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        />
      )}

      {/* ADD MODE */}
      {addMode && (
        <View>
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Add a task..."
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />

          <Pressable
            onPress={() => setShowAddDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              {newDueAt ? `📅 ${new Date(newDueAt).toDateString()}` : 'Set Due Date'}
            </Text>
          </Pressable>

          {showAddDatePicker && (
            <DateTimePicker
              value={newDueAt ? new Date(newDueAt) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowAddDatePicker(false);
                if (event.type !== 'dismissed' && selectedDate) {
                  setNewDueAt(selectedDate.toISOString());
                }
              }}
            />
          )}

          <Pressable
            onPress={handleAddTask}
            style={[styles.addButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.addButtonText}>Add Task</Text>
          </Pressable>
        </View>
      )}

      {/* DATE FILTER */}
      <View style={styles.addControls}>
        <Pressable
          onPress={() => setShowFilterPicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>
            {filterDate ? `Filter: ${filterDate}` : 'Filter by Date'}
          </Text>
        </Pressable>

        {filterDate && (
          <Pressable
            onPress={() => setFilterDate(null)}
            style={styles.clearFilter}
          >
            <Text style={styles.clearFilterText}>Clear</Text>
          </Pressable>
        )}
      </View>

      {showFilterPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowFilterPicker(false);
            if (event.type !== 'dismissed' && selectedDate) {
              setFilterDate(selectedDate.toISOString().split('T')[0]);
            }
          }}
        />
      )}

      {/* TASK LIST */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggleComplete={handleToggleComplete}
            onDelete={(id) => setDeleteId(id)}
            onUpdateDetails={handleUpdateDetails}
          />
        )}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <Modal visible={deleteId !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Delete Task?
            </Text>

            <Text style={[styles.modalMessage, { color: colors.text }]}>
              Are you sure you want to delete this task?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setDeleteId(null)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={{ color: colors.text }}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={confirmDelete}
                style={[styles.modalButton, styles.deleteButton]}
              >
                <Text style={{ color: '#fff' }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TasksScreen;

/* ---------------------- Styles ---------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  archiveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  archiveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconButton: {
    padding: 8,
    opacity: 0.4,
  },
  activeIcon: {
    opacity: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 12,
  },
  addControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
  },
  clearFilter: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  clearFilterText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },
  addButton: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* DELETE MODAL */
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#eee',
  },
  deleteButton: {
    backgroundColor: '#d22',
  },
});
