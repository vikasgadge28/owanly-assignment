import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';
import RestaurantRatingMeta from './RestaurantRatingMeta';
import { type RestaurantCardBaseProps } from './restaurantCardUtils';

/** Half-screen card inset on a 375pt baseline → 155pt card, 131pt image (155 − 24 padding). */
const HALF_CARD_HORIZONTAL_INSET = 32;

function CompactRestaurantCard({
  restaurant,
  onPress,
  width,
}: RestaurantCardBaseProps) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = width ?? screenWidth / 2 - HALF_CARD_HORIZONTAL_INSET;
  const rating = restaurant.platformRating?.value;
  const reviewCount = restaurant.platformRating?.count;
  const eta =
    restaurant.etaInMinutes != null ? `${restaurant.etaInMinutes} mins` : null;
  const displayTag = restaurant.displayTags?.join(' • ') || restaurant.name;
  const trustMarkerLabel = restaurant.trustMarkers?.[0]?.name;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(restaurant)}
      style={[styles.card, { width: cardWidth }]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={styles.imageFrame}
          resizeMode="cover"
        />
        {trustMarkerLabel ? (
          <View style={styles.trustMarkerPill}>
            <Text style={styles.trustMarkerIcon}>♛</Text>
            <Text style={styles.trustMarkerText} numberOfLines={1}>
              {trustMarkerLabel}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <RestaurantRatingMeta
          name={restaurant.name}
          rating={rating}
          reviewCount={reviewCount}
          eta={eta}
          detailLine={displayTag}
          variant="compact"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: '#F9F9F9',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 0.8,
  },
  imageWrap: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    position: 'relative',
  },
  imageFrame: {
    width: 131,
    height: 131,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  image: { width: '100%', height: '100%' },
  trustMarkerPill: {
    position: 'absolute',
    left: spacing.md,
    bottom: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 4,
    borderColor: '#FFF8E6',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xxs,
    paddingVertical: spacing.xxs,
    gap: spacing.xs,
  },
  trustMarkerIcon: {
    color: '#EF765E',
    fontSize: 12,
    fontWeight: '700',
  },
  trustMarkerText: {
    flexShrink: 1,
    color: '#EF765E',
    fontSize: 10,
    fontWeight: '700',
  },
  body: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
});

export default React.memo(CompactRestaurantCard);
