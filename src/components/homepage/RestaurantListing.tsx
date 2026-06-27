import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '../../constants/theme';
import RestaurantCard from './RestaurantCard';
import type { RestaurantEntity } from '../../types/homepage';
import FilterBar from './FilterBar';
interface Props {
  restaurants: RestaurantEntity[];
  title?: string;
}

/**
 * Main vertical restaurant listing (paginated_restaurant_feed).
 * Rendered as plain mapped rows so it can live inside the page-level scroll
 * view alongside the sticky header.
 */
function RestaurantListing({
  restaurants,
  title = 'All restaurants',
}: Props) {
  if (!restaurants?.length) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FilterBar />
      {restaurants.map(restaurant => (
        <View key={restaurant.entityId} style={styles.cardWrap}>
          <RestaurantCard restaurant={restaurant} variant="feed" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.lg },
  title: {
    ...typography.sectionTitle,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  cardWrap: {
    marginBottom: spacing.lg,
  },
});

export default React.memo(RestaurantListing);
