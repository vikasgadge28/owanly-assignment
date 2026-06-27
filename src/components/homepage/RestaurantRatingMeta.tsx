import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../constants/assets';
import { colors, spacing, typography } from '../../constants/theme';
import { formatReviewCount } from './restaurantCardUtils';

interface Props {
  name: string;
  rating?: number;
  reviewCount?: number;
  eta?: string | null;
  middleLine?: string | null;
  detailLine?: string | null;
  variant?: 'feed' | 'compact';
}

function RestaurantRatingMeta({
  name,
  rating,
  reviewCount,
  eta,
  middleLine,
  detailLine,
  variant = 'feed',
}: Props) {
  const isCompact = variant === 'compact';
  const showRatingRow = rating != null || eta;

  return (
    <View>
      <Text
        style={[styles.title, isCompact && styles.titleCompact]}
        numberOfLines={isCompact ? 1 : undefined}
      >
        {name}
      </Text>
      {showRatingRow ? (
        <View style={styles.metaLeft} >
          {rating != null ? (
            <>
              <Image source={icons.star} style={styles.ratingStarIcon} />
              <Text style={[styles.ratingValue, isCompact && styles.metaCompact]}>
                {rating.toFixed(1)}
              </Text>
              {reviewCount != null ? (
                <Text style={[styles.reviewCount, isCompact && styles.metaCompact]}>
                  {formatReviewCount(reviewCount)}
                </Text>
              ) : null}
            </>
          ) : null}
          {eta ? (
            <>
              <View style={styles.metaDot} />
              <Image source={icons.bolt} style={styles.etaIcon} />
              <Text
                style={[styles.eta, isCompact && styles.metaCompact]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {eta}
              </Text>
            </>
          ) : null}
        </View>
      ) : null}
      {middleLine ? (
        <Text style={styles.middleLine}>{middleLine}</Text>
      ) : null}
      {detailLine ? (
        <Text
          style={variant === 'feed' ? styles.priceLine : styles.lastOrderTag}
          numberOfLines={1}
        >
          {detailLine}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    maxWidth: '90%',
  },
  titleCompact: {
    fontSize: 14,
  },
  metaCompact: {
    fontSize: 12,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: spacing.xxs + 1,
    marginTop: spacing.sm,
  },
  ratingStarIcon: {
    width: 14,
    height: 14,
  },
  ratingValue: {
    color: colors.rating,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: spacing.xxs,
    flexShrink: 0,
  },
  reviewCount: {
    color: colors.textTertiary,
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 0,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#666666',
    marginHorizontal: spacing.xxs,
  },
  etaIcon: {
    width: 14,
    height: 14,
  },
  eta: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    flexShrink: 1,
  },
  middleLine: {
    ...typography.caption,
    marginTop: spacing.xxs,
  },
  priceLine: {
    marginTop: spacing.sm,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  lastOrderTag: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});

export default React.memo(RestaurantRatingMeta);
