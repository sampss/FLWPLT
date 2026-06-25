import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme, useNavigation } from '@react-navigation/native';
import AppHeader from '@shared_components/AppHeader';

import { Task } from '@typesafe/Task';
import TaskCard from '@task_components/TaskCard';
import ArchiveButton from '@shared_components/ArchiveButton';
import { archiveCompletedTasks, mockArchiveWrite } from '@shared_services/ArchiveService';
import { makeTaskStyles } from '@features/tasks/screens/TaskListScreenStyles';

export const TasksScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = makeTaskStyles(theme);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'add' | 'search'>('add');
  const [completeBy, setCompleteBy] = useState<string | undefined>();
  const [filterDate, setFilterDate] = useState<string | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // -----------------------------
  // FILTERING
  // -----------------------------
  const applyFilters = () => {
    const normalized = query.toLowerCase();

    if (mode === 'search') {
      setDisplayedTasks(
        tasks.filter(task => {
          const matchesQuery = task.title.toLowerCase().includes(normalized);
          const matchesDate =
            !filterDate ||
            (task.completeBy &&
              new Date(task.completeBy).toDateString() ===
                new Date(filterDate).toDateString());

          return matchesQuery && matchesDate;
        })
      );
    } else {
      setDisplayedTasks(tasks);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [query, tasks, mode]);

  useEffect(() => {
    if (mode === 'search') applyFilters();
  }, [filterDate]);

  // -----------------------------
  // CRUD OPERATIONS
  // -----------------------------
  const handleAddTask = (title: string, date?: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      completeBy: date,
      details: '',
    };

    setTasks(prev => [newTask, ...prev]);
    setQuery('');
    setCompleteBy(undefined);
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleUpdateDetails = (id: number, newDetails: string, newDate?: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, details: newDetails, completeBy: newDate ?? task.completeBy }
          : task
      )
    );
  };

  const confirmDelete = (taskId: number) => {
    setPendingDeleteId(taskId);
    setDeleteModalVisible(true);
  };

  const handleArchiveSelected = async () => {
    const selected = tasks.filter(t => t.completed);
    if (selected.length === 0) return;

    try {
      await archiveCompletedTasks(selected, mockArchiveWrite, { appId: 'FlowPilot' });
      setTasks(prev => prev.filter(t => !t.completed));
    } catch (error) {
      console.error('Archive failed:', error);
    }
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <View style={styles.container}>

      {/* Header */}
      <AppHeader
        title="Tasks"
        rightElement={<ArchiveButton onPress={handleArchiveSelected} />}
      />

      {/* INPUT ROW */}
      <View style={styles.inputRow}>
        <Pressable
          onPress={() => setMode('add')}
          style={[styles.iconButton, mode === 'add' && styles.activeIcon]}
        >
          <Text style={{ fontSize: 20 }}>✏️</Text>
        </Pressable>

        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={mode === 'add' ? 'Add a task...' : 'Search tasks...'}
          placeholderTextColor={theme.colors.text + '88'}
        />

        <Pressable
          onPress={() => setMode('search')}
          style={[styles.iconButton, mode === 'search' && styles.activeIcon]}
        >
          <Text style={{ fontSize: 20 }}>🔍</Text>
        </Pressable>
      </View>

      {/* DATE + ADD BUTTON */}
      <View style={styles.addControls}>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>
            {mode === 'add'
              ? completeBy
                ? `📅 ${new Date(completeBy).toDateString()}`
                : '📅 Due Date'
              : filterDate
                ? `🔎 ${new Date(filterDate).toDateString()}`
                : '🔎 Filter Due Date'}
          </Text>
        </Pressable>

        {mode === 'search' && filterDate && (
          <Pressable
            onPress={() => setFilterDate(undefined)}
            style={styles.clearFilter}
          >
            <Text style={styles.clearFilterText}>✖️ Clear</Text>
          </Pressable>
        )}

        {mode === 'add' && (
          <View style={styles.addButtonWrapper}>
            <Button
              title="Add"
              onPress={() => {
                if (query.trim()) handleAddTask(query.trim(), completeBy);
              }}
            />
          </View>
        )}
      </View>

      {/* DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={
            mode === 'add'
              ? completeBy
                ? new Date(completeBy)
                : new Date()
              : filterDate
                ? new Date(filterDate)
                : new Date()
          }
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (event.type !== 'dismissed' && selectedDate) {
              const iso = selectedDate.toISOString();
              if (mode === 'add') setCompleteBy(iso);
              else setFilterDate(iso);
            }
          }}
        />
      )}

      {/* TASK LIST */}
      <FlatList
        data={displayedTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggleComplete={handleToggleComplete}
            onDelete={confirmDelete}
            onUpdateDetails={handleUpdateDetails}
          />
        )}
      />

      {/* DELETE MODAL */}
      {deleteModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Delete Task?</Text>

            <Text style={styles.modalMessage}>
              This will permanently delete the task.
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => {
                  setDeleteModalVisible(false);
                  setPendingDeleteId(null);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  if (pendingDeleteId !== null) {
                    setTasks(prev => prev.filter(t => t.id !== pendingDeleteId));
                  }
                  setDeleteModalVisible(false);
                  setPendingDeleteId(null);
                }}
              >
                <Text style={styles.deleteButton}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
