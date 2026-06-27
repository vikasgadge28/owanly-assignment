import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

interface Props {
  title?: string;
  message?: string;
  icon?: string;
}

/** Generic empty placeholder for sections / lists with no data. */
function EmptyState({
  title = 'Nothing here yet',
  message = 'Check back in a little while.',
  icon = '🍽️',
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  icon: { fontSize: 40, marginBottom: spacing.md },
  title: { ...typography.h2, marginBottom: spacing.xs },
  message: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textTertiary,
  },
});

export default EmptyState;
