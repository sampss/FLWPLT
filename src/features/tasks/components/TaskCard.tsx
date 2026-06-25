import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Task } from '@typesafe/Task';

interface Props {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateDetails: (id: number, details: string, date?: string) => void;
}

const TaskCard: React.FC<Props> = ({
  task,
  onToggleComplete,
  onDelete,
  onUpdateDetails,
}) => {
  const theme = useTheme();
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState(task.details);

  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 16,
        marginBottom: 12,
      }}
    >
      {/* TITLE ROW */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable onPress={() => onToggleComplete(task.id)}>
          <Text style={{ fontSize: 20 }}>
            {task.completed ? '☑️' : '⬜'}
          </Text>
        </Pressable>

        <Text
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: theme.colors.text,
            textDecorationLine: task.completed ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </Text>

        <Pressable onPress={() => onDelete(task.id)}>
          <Text style={{ fontSize: 20, color: 'red' }}>🗑️</Text>
        </Pressable>
      </View>

      {/* DUE DATE */}
      {task.completeBy && (
        <Text
          style={{
            marginTop: 6,
            fontSize: 12,
            color: theme.colors.text,
            opacity: 0.7,
          }}
        >
          📅 {new Date(task.completeBy).toDateString()}
        </Text>
      )}

      {/* DETAILS */}
      {editing ? (
        <TextInput
          value={details}
          onChangeText={setDetails}
          onBlur={() => {
            setEditing(false);
            onUpdateDetails(task.id, details);
          }}
          multiline
          style={{
            marginTop: 8,
            padding: 8,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderRadius: 6,
          }}
        />
      ) : (
        <Pressable onPress={() => setEditing(true)}>
          <Text
            style={{
              marginTop: 8,
              color: theme.colors.text,
              opacity: 0.8,
            }}
          >
            {details ? details : 'Add details…'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default TaskCard;
