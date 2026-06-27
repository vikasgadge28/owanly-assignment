import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

interface Props {
  message?: string;
}

/** Full-screen loading indicator shown while serviceability/feed load. */
function LoadingState({ message = 'Finding great food near you…' }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
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
    padding: spacing.xl,
  },
  message: {
    ...typography.body,
    marginTop: spacing.md,
  },
});

export default LoadingState;
