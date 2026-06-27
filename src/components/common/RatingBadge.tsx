import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';

interface Props {
  value?: number;
  count?: number;
  compact?: boolean;
}

/** Green rating pill (e.g. "4.2 ★") used across restaurant/food cards. */
function RatingBadge({ value, count, compact = false }: Props) {
  if (value == null) {
    return null;
  }

  const bg = value >= 4 ? colors.rating : colors.ratingPoor;

  return (
    <View style={styles.row}>
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={styles.value}>{value.toFixed(1)}</Text>
        <Text style={styles.star}>★</Text>
      </View>
      {!compact && count != null ? (
        <Text style={styles.count}>
          {count > 999 ? `${(count / 1000).toFixed(1)}K` : count}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs + 1,
    paddingVertical: 2,
  },
  value: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  star: { color: '#FFFFFF', fontSize: 9, marginLeft: 2 },
  count: {
    color: colors.textTertiary,
    fontSize: 11,
    marginLeft: spacing.xs,
  },
});

export default React.memo(RatingBadge);
