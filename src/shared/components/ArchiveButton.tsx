import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface Props {
  onPress: () => void;
  centerText?: string;
  btnColor?: string;
}

const ArchiveButton: React.FC<Props> = ({ onPress, centerText = '📦', btnColor = 'green' }) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: btnColor,
        borderColor: theme.colors.text,
        borderWidth: 1.5,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        {centerText}
      </Text>
    </Pressable>
  );
};

export default ArchiveButton;
