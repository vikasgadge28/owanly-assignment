import React from 'react';
import type { RestaurantEntity } from '../../types/homepage';
import CompactRestaurantCard from './CompactRestaurantCard';
import FeedRestaurantCard from './FeedRestaurantCard';
import FullRestaurantCard from './FullRestaurantCard';

export type RestaurantCardVariant = 'compact' | 'full' | 'feed';

interface Props {
  restaurant: RestaurantEntity;
  variant?: RestaurantCardVariant;
  width?: number;
  onPress?: (r: RestaurantEntity) => void;
}

/**
 * Reusable restaurant card.
 *  - "compact": fixed-width tile for horizontal carousels (reorder / curated)
 *  - "full":    full-width row for compact list rows
 *  - "feed":    full-width card with hero image for paginated restaurant feed
 */
function RestaurantCard({
  restaurant,
  variant = 'compact',
  width = 160,
  onPress,
}: Props) {
  switch (variant) {
    case 'full':
      return (
        <FullRestaurantCard
          restaurant={restaurant}
          width={width}
          onPress={onPress}
        />
      );
    case 'feed':
      return (
        <FeedRestaurantCard
          restaurant={restaurant}
          width={width}
          onPress={onPress}
        />
      );
    case 'compact':
    default:
      return (
        <CompactRestaurantCard
          restaurant={restaurant}
          width={width}
          onPress={onPress}
        />
      );
  }
}

export default React.memo(RestaurantCard);
