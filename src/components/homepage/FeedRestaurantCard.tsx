import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing, typography } from '../../constants/theme';
import {
  getBadgeLabel,
  getCuisineLine,
  getHighlightText,
  type RestaurantCardBaseProps,
} from './restaurantCardUtils';
import RestaurantRatingMeta from './RestaurantRatingMeta';

function FeedRestaurantCard({ restaurant, onPress }: RestaurantCardBaseProps) {
  const badgeLabel = getBadgeLabel(restaurant);
  const highlightText = getHighlightText(restaurant);
  const cuisineLine = getCuisineLine(restaurant);
  const rating = restaurant.platformRating?.value;
  const reviewCount = restaurant.platformRating?.count;
  const distance =
    restaurant.distanceInKM != null
      ? `${restaurant.distanceInKM.toFixed(1)} km`
      : null;
  const eta =
    restaurant.etaInMinutes != null ? `${restaurant.etaInMinutes} mins` : null;
  const area = restaurant.address?.area;
  const priceLine =
    restaurant.price != null
      ? `₹${restaurant.price} for one${cuisineLine ? ` | ${cuisineLine}` : ''}`
      : cuisineLine;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(restaurant)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: restaurant.imageUrl }}
          style={styles.imageWrap}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          {badgeLabel ? (
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>◆</Text>
              <Text style={styles.badgeText}>{badgeLabel}</Text>
            </View>
          ) : null}

          {highlightText ? (
            <View style={styles.highlight}>
              <View style={styles.highlightAccent} />
              <Text style={styles.highlightText} numberOfLines={1}>
                {highlightText}
              </Text>
            </View>
          ) : null}

          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.body}>
        <RestaurantRatingMeta
          name={restaurant.name}
          rating={rating}
          reviewCount={reviewCount}
          eta={eta}
          detailLine={priceLine}
          variant="feed"
        />
        <View style={styles.metaRight}>
          {distance ? <Text style={styles.distance}>{distance}</Text> : null}
          {area ? (
            <Text style={styles.area} numberOfLines={1} ellipsizeMode="tail">
              {area}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: '#F9F9F9',
    overflow: 'hidden',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 0.8,
    flex: 1,
  },
  imageWrap: {
    aspectRatio: 1.75,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: spacing.xl,
  },
  image: {
    borderRadius: radius.xl,
  },
  imageContainer: {
    flex: 1,
    padding: spacing.md,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
    borderRadius: spacing.lg,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
    backgroundColor: '#E3F6FF',
  },
  badgeIcon: {
    color: '#2563EB',
    fontSize: 10,
  },
  badgeText: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '700',
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 28, 30, 0.82)',
    borderTopRightRadius: radius.pill,
    borderBottomRightRadius: radius.pill,
    overflow: 'hidden',
    maxWidth: '78%',
  },
  highlightAccent: {
    width: 3,
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
  },
  highlightText: {
    flex: 1,
    color: colors.star,
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
  },
  dots: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.surface,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  metaRight: {
    alignItems: 'flex-end',
  },
  distance: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'right',
  },
  area: {
    ...typography.caption,
    flexShrink: 1,
    fontWeight: '600',
    color: colors.textTertiary,
    textAlign: 'left',
    maxWidth: 100,
  },
});

export default React.memo(FeedRestaurantCard);
