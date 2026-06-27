/**
 * Drives the homepage data flow described in the assignment:
 *   1. check serviceability
 *   2. if serviceable, load feed config
 *   3. fan out to the section endpoints and assemble view-ready data
 */

import { useCallback, useEffect, useState } from 'react';
import {
  checkServiceability,
  getCuratedListDetails,
  getCuratedRestaurants,
  getFeedConfig,
  getMealForOneItems,
  getPaginatedRestaurantFeed,
  getPastOrders,
} from '../data/homepageApi';
import type {
  CuratedListItem,
  FeedConfig,
  FoodItem,
  RestaurantEntity,
} from '../types/homepage';

export type HomepageStatus =
  | 'loading'
  | 'non-serviceable'
  | 'error'
  | 'ready';

export interface CuratedSection {
  id: string;
  title: string;
  restaurants: RestaurantEntity[];
}

export interface HomepageData {
  feedConfig: FeedConfig;
  topBannerImage?: string;
  reorder: RestaurantEntity[];
  mealForOne: FoodItem[];
  curatedSections: CuratedSection[];
  whatsOnYourMind: CuratedListItem[];
  restaurants: RestaurantEntity[];
}

interface HomepageState {
  status: HomepageStatus;
  data?: HomepageData;
}

export function useHomepage() {
  const [state, setState] = useState<HomepageState>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const serviceability = await checkServiceability();
      if (!serviceability.isServiceable) {
        setState({ status: 'non-serviceable' });
        return;
      }

      const feedConfig = await getFeedConfig();

      // Curated restaurant sections: one fetch per configured curated id.
      const curatedDefs = feedConfig.restaurant.curatedListDetailsList ?? [];
      const [
        pastOrders,
        mealForOne,
        whatsOnYourMind,
        restaurants,
        ...curatedResults
      ] = await Promise.all([
        getPastOrders(),
        getMealForOneItems(),
        getCuratedListDetails(),
        getPaginatedRestaurantFeed(),
        ...curatedDefs.map(def => getCuratedRestaurants(def.id)),
      ]);

      const curatedSections: CuratedSection[] = curatedDefs
        .map((def, index) => ({
          id: def.id,
          title: def.name,
          restaurants: curatedResults[index] ?? [],
        }))
        .filter(section => section.restaurants.length > 0);

      setState({
        status: 'ready',
        data: {
          feedConfig,
          topBannerImage:
            feedConfig.restaurant.topBanner?.banners?.[0]?.imageUrl,
          reorder: pastOrders,
          mealForOne,
          curatedSections,
          whatsOnYourMind,
          restaurants,
        },
      });
    } catch {
      setState({ status: 'error' });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
