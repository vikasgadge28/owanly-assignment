import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing, typography } from '../../constants/theme';

const FILTERS = ['Filters', 'Sort by', 'Rating 4.0+', 'Pure Veg', 'Offers'];

/**
 * Filter chip row. This (together with "What's on your mind?") becomes a
 * sticky header once the user scrolls past it — wired up in HomeScreen.
 */
function FilterBar() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {FILTERS.map(label => (
          <TouchableOpacity key={label} style={styles.chip} activeOpacity={0.8}>
            <Text style={styles.chipText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  content: { paddingHorizontal: spacing.lg },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    marginRight: spacing.sm,
  },
  chipText: { ...typography.caption, color: colors.textPrimary, fontWeight: '600' },
});

export default React.memo(FilterBar);
