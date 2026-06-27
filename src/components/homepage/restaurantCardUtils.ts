import type { RestaurantEntity } from '../../types/homepage';

export interface RestaurantCardBaseProps {
  restaurant: RestaurantEntity;
  width?: number;
  onPress?: (r: RestaurantEntity) => void;
}

export function formatReviewCount(count: number): string {
  if (count >= 1000) {
    const value = count / 1000;
    const formatted = value >= 10 ? Math.round(value) : value.toFixed(1);
    return `(${formatted}k+)`;
  }
  return `(${count})`;
}

export function titleCase(value: string): string {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getBadgeLabel(restaurant: RestaurantEntity): string | null {
  const marker = restaurant.trustMarkers?.[0]?.name;
  if (marker) {
    return marker;
  }
  const tag = restaurant.displayTags?.[0];
  return tag ?? null;
}

export function getHighlightText(restaurant: RestaurantEntity): string | null {
  const dish = restaurant.knownFor?.[0];
  if (!dish) {
    return null;
  }
  return `Famous for its ${titleCase(dish)}`;
}

export function getCuisineLine(restaurant: RestaurantEntity): string | null {
  const cuisines = restaurant.knownFor?.map(titleCase);
  if (!cuisines?.length) {
    return null;
  }
  const unique = [...new Set(cuisines)];
  return unique.join(', ');
}

export function getRestaurantMeta(restaurant: RestaurantEntity): string {
  return [
    restaurant.etaInMinutes ? `${restaurant.etaInMinutes} min` : null,
    restaurant.distanceInKM ? `${restaurant.distanceInKM} km` : null,
  ]
    .filter(Boolean)
    .join(' • ');
}

export function getRestaurantSubtitle(restaurant: RestaurantEntity): string | undefined {
  return restaurant.knownFor?.join(', ') ?? restaurant.displayTags?.join(' • ');
}
