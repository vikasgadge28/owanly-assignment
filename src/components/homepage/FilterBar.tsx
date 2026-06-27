import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';

const googleIcon = require('../../../assets/icons/google.webp');
const downArrowIcon = require('../../../assets/icons/down-arrow.png');
const starIcon = require('../../../assets/icons/star.png');

type FilterChipProps = {
  label: string;
  leftIcon?: ImageSourcePropType;
  ratingIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  variant?: 'default' | 'rating';
};

const FILTERS: FilterChipProps[] = [
  { label: 'Sort by', rightIcon: downArrowIcon },
  { label: '4+', leftIcon: googleIcon, ratingIcon: starIcon, variant: 'rating' },
  { label: 'Under 30 mins' },
  { label: 'Under \u20B9200' },
];

function FilterChip({
  label,
  leftIcon,
  ratingIcon,
  rightIcon,
  variant = 'default',
}: FilterChipProps) {
  const isRating = variant === 'rating';

  return (
    <TouchableOpacity style={styles.chip} activeOpacity={0.8}>
      {leftIcon ? (
        <Image source={leftIcon} style={styles.leftIcon} resizeMode="contain" />
      ) : null}
      {ratingIcon ? (
        <Image
          source={ratingIcon}
          style={styles.ratingIcon}
          resizeMode="contain"
        />
      ) : null}
      <Text style={[styles.chipText, isRating && styles.ratingText]}>
        {label}
      </Text>
      {rightIcon ? (
        <Image
          source={rightIcon}
          style={styles.rightIcon}
          resizeMode="contain"
        />
      ) : null}
    </TouchableOpacity>
  );
}

/**
 * Filter chip row. This (together with "What's on your mind?") becomes a
 * sticky header once the user scrolls past it — wired up in HomeScreen.
 */
function FilterBar() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>
        {FILTERS.map(filter => (
          <FilterChip
            key={filter.label}
            label={filter.label}
            leftIcon={filter.leftIcon}
            ratingIcon={filter.ratingIcon}
            rightIcon={filter.rightIcon}
            variant={filter.variant}
          />
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
    marginTop: 12,
    marginBottom: 16,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: radius.pill,
    flexDirection: 'row',
    marginRight: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '400',
  },
  leftIcon: {
    height: 12,
    width: 12,
  },
  ratingText: {
    color: '#16A239',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  rightIcon: {
    height: 12,
    width: 12,
    marginLeft: spacing.xs,
  },
  ratingIcon: {
    height: 12,
    marginLeft: spacing.xs,
    width: 12,
  },
});

export default React.memo(FilterBar);
