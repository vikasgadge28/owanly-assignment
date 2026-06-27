/**
 * Mock API layer.
 *
 * Reads the local fixture pack and exposes it through async functions that
 * mirror the real homepage endpoints. No real network calls are made; this
 * keeps the screen/hook code identical to a production data flow so swapping
 * in a real backend later is trivial.
 */

import fixtures from './fixtures.json';
import type {
  CuratedListItem,
  FeedConfig,
  FoodItem,
  RestaurantEntity,
  Serviceability,
} from '../types/homepage';

const NETWORK_DELAY_MS = 350;

function delayed<T>(value: T, ms: number = NETWORK_DELAY_MS): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

/** POST /serviceability/check */
export function checkServiceability(): Promise<Serviceability> {
  return delayed(fixtures.serviceability.data as Serviceability);
}

/** GET /feed-configs/current-feed-config */
export function getFeedConfig(): Promise<FeedConfig> {
  return delayed(fixtures.feed_config.data as unknown as FeedConfig);
}

/** POST /getFeedForCuratedList (meal-for-one) */
export function getMealForOneItems(): Promise<FoodItem[]> {
  return delayed(fixtures.curated_feed_Food_item.data.FoodItems as FoodItem[]);
}

/**
 * POST /getFeedForCuratedList (restaurant curated section).
 * In the real flow this is called once per curated id; here every curated id
 * resolves to the same local fixture.
 */
export function getCuratedRestaurants(
  _curatedId: string,
): Promise<RestaurantEntity[]> {
  return delayed(
    fixtures.curated_feed_res_item.data.EntityResults as RestaurantEntity[],
  );
}

/** POST /getCuratedListDetails ("What's on your mind?") */
export function getCuratedListDetails(): Promise<CuratedListItem[]> {
  return delayed(fixtures.curated_list_details.data as CuratedListItem[]);
}

/** POST /get-feed-for-user-past-orders (reorder) */
export function getPastOrders(): Promise<RestaurantEntity[]> {
  return delayed(fixtures.past_orders.data.EntityResults as RestaurantEntity[]);
}

/** POST /getPaginatedRestaurantFeed (main listing) */
export function getPaginatedRestaurantFeed(): Promise<RestaurantEntity[]> {
  return delayed(
    fixtures.paginated_restaurant_feed.data.EntityResults as RestaurantEntity[],
  );
}
