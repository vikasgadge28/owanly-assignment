import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '../../constants/theme';

interface Props {
  title: string;
  subtitle?: string;
  paddingLeft?: number;
}

/** Reusable section title used above each homepage section. */
function SectionHeader({ title, subtitle, paddingLeft }: Props) {
  return (
    <View
      style={[
        styles.container,
        paddingLeft != null && { paddingLeft, paddingRight: spacing.lg },
      ]}
    >
      <Text style={typography.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.xxs,
  },
});

export default React.memo(SectionHeader);
