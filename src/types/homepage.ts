/**
 * Types describing the local fixture pack
 * (docs/homepage-assignment-candidate-fixtures.json) and the shapes the
 * homepage components consume.
 */

export interface Rating {
  type?: string;
  value: number;
  count: number;
}

/* ----------------------------- Serviceability ---------------------------- */

export interface Serviceability {
  isServiceable: boolean;
  reason: string;
  message: string;
}

/* ------------------------------ Feed config ------------------------------ */

export interface CuratedListDetail {
  id: string;
  name: string;
  imageUrl?: string;
  backGroundColour?: string;
  section?: string;
  rank?: number;
  deepLinkUrl?: string;
  coverImageUrl?: string;
  subText?: string;
  curatedListType?: string;
  foodType?: string;
}

export interface TopBannerItem {
  id: string;
  name: string;
  curatedListId?: string;
  imageUrl: string;
  backGroundColour?: string;
  gifUrl?: string;
  deepLinkUrl?: string;
}

export interface TopBanner {
  banners: TopBannerItem[];
  rank: number;
  section: string;
}

export interface CuratedListGroup {
  id: string;
  name: string;
  imageUrl?: string;
  backGroundColour?: string | null;
  curatedListIds: string[];
  rank?: number;
  section?: string;
}

export interface ReorderConfig {
  name: string;
  rank: number;
  imageUrl?: string;
  backGroundColour?: string;
}

export interface FeedConfig {
  mealForOne: {
    id: string;
    name: string;
    section: string;
    curatedListDetailsList: CuratedListDetail[];
  };
  restaurant: {
    id: string;
    name: string;
    section: string;
    topBanner: TopBanner;
    curatedListGroups: CuratedListGroup[];
    curatedListDetailsList: CuratedListDetail[];
    reOrderConfig: ReorderConfig;
  };
  timeRange?: { from: number; to: number };
}

/* -------------------------------- Cards ---------------------------------- */

export interface FoodItem {
  foodItemId: string;
  resId: string;
  resName: string;
  name: string;
  price: number;
  displayPrice?: number;
  displayMarkupPrice?: number;
  markUpDisplayPrice?: number;
  imageUrl: string;
  vegOrNonVeg: 'veg' | 'non-veg' | string;
  hasVariants: boolean;
  distanceInKm?: number;
  etaInMinutes: number;
  ResRatingResponse?: Rating;
  resImageUrl?: string;
}

export interface TrustMarker {
  type: string;
  name: string;
}

export interface RestaurantAddress {
  city?: string;
  area?: string;
}

export interface RestaurantEntity {
  entityId: string;
  name: string;
  imageUrl: string;
  brandLogo?: string;
  price?: number;
  etaInMinutes: number;
  distanceInKM: number;
  knownFor?: string[];
  displayTags?: string[];
  platformRating?: Rating;
  orderingEnabled?: boolean;
  address?: RestaurantAddress;
  trustMarkers?: TrustMarker[];
}

export interface CuratedListItem {
  id: string;
  name: string;
  imageUrl: string;
}

/* ----------------------------- Raw fixtures ------------------------------ */

export interface FixturePack {
  serviceability: { data: Serviceability };
  feed_config: { data: FeedConfig };
  curated_feed_Food_item: { data: { FoodItems: FoodItem[] } };
  curated_feed_res_item: { data: { EntityResults: RestaurantEntity[] } };
  curated_list_details: { data: CuratedListItem[] };
  past_orders: { data: { EntityResults: RestaurantEntity[] } };
  paginated_restaurant_feed: { data: { EntityResults: RestaurantEntity[] } };
}
