import { StyleSheet } from 'react-native';

export const makeTaskStyles = (theme: any) =>
  StyleSheet.create({
    /* ---------------- ROOT ---------------- */
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      paddingTop: 12,
    },

    /* ---------------- INPUT ROW ---------------- */
    inputRow: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 12,
      alignItems: 'center',
    },

    iconButton: {
      padding: 8,
      opacity: 0.4,
    },

    activeIcon: {
      opacity: 1,
    },

    input: {
      flex: 1,
      backgroundColor: theme.colors.card,
      color: theme.colors.text,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 8,
    },

    /* ---------------- DATE + ADD CONTROLS ---------------- */
    addControls: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 12,
      alignItems: 'center',
    },

    dateButton: {
      backgroundColor: theme.colors.card,
      padding: 10,
      borderRadius: 8,
      flex: 1,
    },

    dateButtonText: {
      color: theme.colors.text,
    },

    clearFilter: {
      marginLeft: 8,
      padding: 10,
    },

    clearFilterText: {
      color: theme.colors.text,
    },

    addButtonWrapper: {
      marginLeft: 12,
    },

    /* ---------------- MODAL ---------------- */
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#00000088',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalBox: {
      backgroundColor: theme.colors.card,
      padding: 20,
      borderRadius: 12,
      width: '80%',
    },

    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
    },

    modalMessage: {
      marginTop: 10,
      color: theme.colors.text,
    },

    modalButtons: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'flex-end',
    },

    modalButton: {
      marginRight: 16,
    },

    deleteButton: {
      color: 'red',
    },

    cancelButtonText: {
      color: theme.colors.text,
    },
  });
