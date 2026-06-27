import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

interface Props {
  message?: string;
}

/** Shown when serviceability returns isServiceable = false. */
function NonServiceableState({
  message = "We're not delivering to your location just yet.",
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📍</Text>
      <Text style={styles.title}>Location not serviceable</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.xxl,
  },
  icon: { fontSize: 48, marginBottom: spacing.lg },
  title: { ...typography.h1, marginBottom: spacing.sm },
  message: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});

export default NonServiceableState;
