import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing, typography } from '../../constants/theme';
import { RatingBadge } from '../common';
import {
  getRestaurantMeta,
  getRestaurantSubtitle,
  type RestaurantCardBaseProps,
} from './restaurantCardUtils';

function FullRestaurantCard({ restaurant, onPress }: RestaurantCardBaseProps) {
  const meta = getRestaurantMeta(restaurant);
  const subtitle = getRestaurantSubtitle(restaurant);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(restaurant)}
      style={[styles.card, styles.cardFull]}>
      <View style={[styles.imageWrap, styles.imageWrapFull]}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {restaurant.brandLogo ? (
          <Image source={{ uri: restaurant.brandLogo }} style={styles.brand} />
        ) : null}
      </View>

      <View style={[styles.body, styles.bodyFull]}>
        <View style={styles.titleRow}>
          <Text style={typography.cardTitle} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <RatingBadge
            value={restaurant.platformRating?.value}
            compact
          />
        </View>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
  },
  cardFull: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1.3,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  imageWrapFull: {
    width: 96,
    height: 96,
    aspectRatio: undefined,
  },
  image: { width: '100%', height: '100%' },
  brand: {
    position: 'absolute',
    bottom: spacing.xs,
    left: spacing.xs,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  body: { paddingTop: spacing.sm },
  bodyFull: { flex: 1, paddingTop: 0, paddingLeft: spacing.md },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: { ...typography.caption, marginTop: spacing.xxs },
  subtitle: { ...typography.caption, marginTop: spacing.xxs },
});

export default React.memo(FullRestaurantCard);
