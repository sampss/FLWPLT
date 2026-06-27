import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { Task } from '@tasks/types/Task';

type Props = {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateDetails: (
    id: number,
    newNotes: string,
    newDate?: string,
    newTitle?: string
  ) => void;
};

const TaskCard: React.FC<Props> = ({
  task,
  onToggleComplete,
  onDelete,
  onUpdateDetails,
}) => {
  const { colors } = useTheme();

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editNotes, setEditNotes] = useState(task.notes ?? '');
  const [editDueAt, setEditDueAt] = useState<string | undefined>(task.dueAt);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const isOverdue =
    task.dueAt && new Date(task.dueAt).getTime() < new Date().setHours(0, 0, 0, 0);

  const saveChanges = () => {
    onUpdateDetails(task.id, editNotes, editDueAt, editTitle);
    setEditing(false);
    setDetailsVisible(false);
  };

  return (
    <>
      {/* CARD */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.row}>
          {/* Checkbox */}
          <Pressable onPress={() => onToggleComplete(task.id)} style={styles.checkbox}>
            <Text style={styles.checkboxText}>
              {task.isCompleted ? '✔️' : '⬜'}
            </Text>
          </Pressable>

          {/* Title */}
          <Text
            style={[
              styles.title,
              { color: colors.text },
              task.isCompleted && styles.completedTitle,
            ]}
          >
            {task.title}
          </Text>

          {/* Edit */}
          <Pressable onPress={() => setDetailsVisible(true)}>
            <Text style={styles.icon}>✏️</Text>
          </Pressable>

          {/* Delete */}
          <Pressable onPress={() => onDelete(task.id)}>
            <Text style={styles.icon}>🗑️</Text>
          </Pressable>
        </View>

        {/* Due Date */}
        {task.dueAt && (
          <Text
            style={[
              styles.dueDate,
              { color: isOverdue ? 'red' : colors.text },
            ]}
          >
            📅 {new Date(task.dueAt).toDateString()}
          </Text>
        )}

        {/* Created Date */}
        {task.createdAt && (
          <Text style={[styles.createdDate, { color: colors.text }]}>
            Created: {new Date(task.createdAt).toDateString()}
          </Text>
        )}

        {/* Details Link */}
        <Pressable onPress={() => setDetailsVisible(true)}>
          <Text style={[styles.detailsLink, { color: colors.primary }]}>
            Details →
          </Text>
        </Pressable>
      </View>

      {/* DETAILS MODAL */}
      <Modal visible={detailsVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}>

            {/* Close Button */}
            <Pressable
              onPress={() => {
                setEditing(false);
                setDetailsVisible(false);
              }}
              style={styles.closeButton}
            >
              <Text style={{ fontSize: 20 }}>✖️</Text>
            </Pressable>

            {/* Title */}
            {!editing ? (
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {task.title}
              </Text>
            ) : (
              <TextInput
                value={editTitle}
                onChangeText={setEditTitle}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              />
            )}

            {/* Notes */}
            {!editing ? (
              <Text style={[styles.modalNotes, { color: colors.text }]}>
                {task.notes || 'No details added.'}
              </Text>
            ) : (
              <TextInput
                value={editNotes}
                onChangeText={setEditNotes}
                multiline
                style={[styles.notesInput, { borderColor: colors.border, color: colors.text }]}
              />
            )}

            {/* Created Date */}
            <Text style={[styles.modalSubText, { color: colors.text }]}>
              Created: {new Date(task.createdAt).toDateString()}
            </Text>

            {/* Due Date */}
            <Pressable
              onPress={() => editing && setShowDatePicker(true)}
              style={styles.dueRow}
            >
              <Text
                style={[
                  styles.modalSubText,
                  { color: editDueAt && new Date(editDueAt) < new Date() ? 'red' : colors.text },
                ]}
              >
                Due: {editDueAt ? new Date(editDueAt).toDateString() : 'None'}
              </Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={editDueAt ? new Date(editDueAt) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (event.type !== 'dismissed' && selectedDate) {
                    setEditDueAt(selectedDate.toISOString());
                  }
                }}
              />
            )}

            {/* Buttons */}
            <View style={styles.buttonRow}>
              {!editing ? (
                <Pressable onPress={() => setEditing(true)} style={[styles.modalButton, { borderColor: colors.border }]}>
                  <Text style={{ color: colors.text }}>Edit</Text>
                </Pressable>
              ) : (
                <>
                  <Pressable
                    onPress={() => {
                      setEditing(false);
                      setEditTitle(task.title);
                      setEditNotes(task.notes ?? '');
                      setEditDueAt(task.dueAt);
                    }}
                    style={[styles.modalButton, { borderColor: colors.border }]}
                  >
                    <Text style={{ color: colors.text }}>Cancel</Text>
                  </Pressable>

                  <Pressable
                    onPress={saveChanges}
                    style={[styles.saveButton, { backgroundColor: colors.primary }]}
                  >
                    <Text style={{ color: '#fff' }}>Save</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TaskCard;

/* ---------------------- Styles ---------------------- */

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxText: {
    fontSize: 22,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  icon: {
    fontSize: 18,
    marginLeft: 10,
  },
  dueDate: {
    marginTop: 6,
    fontSize: 14,
  },
  createdDate: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.7,
  },
  detailsLink: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    width: '90%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalNotes: {
    fontSize: 15,
    marginBottom: 16,
  },
  modalSubText: {
    fontSize: 13,
    marginBottom: 8,
  },
  dueRow: {
    marginBottom: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    minHeight: 80,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 8,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 8,
  },
});
