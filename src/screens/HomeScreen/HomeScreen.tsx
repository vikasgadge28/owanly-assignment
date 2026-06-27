import React, { useRef, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import type { ViewToken } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';
import { useHomepage } from '../../hooks/useHomepage';
import type { CuratedSection } from '../../hooks/useHomepage';
import {
  EmptyState,
  ErrorBoundary,
  LoadingState,
  NonServiceableState,
} from '../../components/common';
import FilterBar from '../../components/homepage/FilterBar';
import HomeTopSection from '../../components/homepage/HomeTopSection';
import MealForOneSection from '../../components/homepage/MealForOneSection';
import ReorderSection from '../../components/homepage/ReorderSection';
import RestaurantCuratedSection from '../../components/homepage/RestaurantCuratedSection';
import RestaurantListing from '../../components/homepage/RestaurantListing';
import WhatsOnYourMind from '../../components/homepage/WhatsOnYourMind';

type HomeSection =
  | { type: 'top-banner' }
  | { type: 'reorder' }
  | { type: 'whats-on-your-mind' }
  | { type: 'meal-for-one' }
  | { type: 'curated-restaurants'; section: CuratedSection }
  | { type: 'restaurant-listing' };

const WHATS_ON_YOUR_MIND: HomeSection['type'] = 'whats-on-your-mind';

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { status, data, reload } = useHomepage();

  // Sticky headers shown when their source section scrolls out of view.
  const [showWhatsSticky, setShowWhatsSticky] = useState(false);
  const [showFilterSticky, setShowFilterSticky] = useState(false);
  // Only reveal the "What's on your mind?" sticky after it has been seen once,
  // so it never flashes on first mount before the user scrolls.
  const hasSeenWhatsOnMind = useRef(false);

  // The FilterBar is nested deep inside the restaurant-listing row, so we
  // measure its on-screen position instead of relying on item viewability.
  const filterBarRef = useAnimatedRef<Animated.View>();
  const filterShown = useSharedValue(false);

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 10 }).current;
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const isVisible = viewableItems.some(
        token => (token.item as HomeSection)?.type === WHATS_ON_YOUR_MIND,
      );
      if (isVisible) {
        hasSeenWhatsOnMind.current = true;
        setShowWhatsSticky(false);
      } else if (hasSeenWhatsOnMind.current) {
        setShowWhatsSticky(true);
      }
    },
  ).current;

  const scrollHandler = useAnimatedScrollHandler(() => {
    const measured = measure(filterBarRef);
    if (measured !== null) {
      const shouldShow = measured.pageY <= insets.top;
      if (shouldShow !== filterShown.value) {
        filterShown.value = shouldShow;
        runOnJS(setShowFilterSticky)(shouldShow);
      }
    }
  });

  if (status === 'loading') {
    return <LoadingState />;
  }
  if (status === 'non-serviceable') {
    return <NonServiceableState />;
  }
  if (status === 'error' || !data) {
    return (
      <EmptyState
        icon="😕"
        title="Couldn't load the homepage"
        message="Pull to refresh or try again."
      />
    );
  }

  const { restaurant, mealForOne: mealForOneCfg } = data.feedConfig;
  const sections: HomeSection[] = [
    { type: 'top-banner' },
    { type: 'reorder' },
    { type: 'whats-on-your-mind' },
    { type: 'meal-for-one' },
    ...data.curatedSections.map(section => ({
      type: 'curated-restaurants' as const,
      section,
    })),
    { type: 'restaurant-listing' },
  ];

  const renderSection = ({ item }: { item: HomeSection }) => {
    switch (item.type) {
      case 'top-banner':
        return <HomeTopSection bannerImageUrl={data.topBannerImage} />;
      case 'reorder':
        return (
          <ReorderSection
            config={restaurant.reOrderConfig}
            restaurants={data.reorder}
          />
        );
      case 'whats-on-your-mind':
        return (
          <WhatsOnYourMind
            title={restaurant.curatedListGroups?.[0]?.name}
            items={data.whatsOnYourMind}
          />
        );
      case 'meal-for-one':
        return (
          <MealForOneSection
            config={mealForOneCfg.curatedListDetailsList?.[0]}
            items={data.mealForOne}
          />
        );
      case 'curated-restaurants':
        return (
          <RestaurantCuratedSection
            title={item.section.title}
            restaurants={item.section.restaurants}
          />
        );
      case 'restaurant-listing':
        return (
          <RestaurantListing
            restaurants={data.restaurants}
            filterBarRef={filterBarRef}
          />
        );
      default:
        return null;
    }
  };

  const keyExtractor = (item: HomeSection) =>
    item.type === 'curated-restaurants'
      ? `${item.type}-${item.section.id}`
      : item.type;

  const isStickyVisible = showWhatsSticky || showFilterSticky;

  return (
    <ErrorBoundary onReset={reload}>
      <StatusBar
        barStyle={isStickyVisible ? 'dark-content' : 'light-content'}
        backgroundColor={isStickyVisible ? colors.background : '#FA287B'}
        animated
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: isStickyVisible ? colors.background : '#FA287B',
          },
        ]}
      >
        <Animated.FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + spacing.xxl },
          ]}
        />
        <View
          pointerEvents="box-none"
          style={[styles.stickyOverlay, { top: insets.top }]}
        >
          {showWhatsSticky && (
            <Animated.View
              entering={FadeInUp.duration(200)}
              exiting={FadeOutUp.duration(150)}
              layout={LinearTransition}
              style={styles.stickyItem}
            >
              <WhatsOnYourMind
                title={restaurant.curatedListGroups?.[0]?.name}
                items={data.whatsOnYourMind}
                showTitle={false}
              />
            </Animated.View>
          )}
          {showFilterSticky && (
            <Animated.View
              entering={FadeInUp.duration(200)}
              exiting={FadeOutUp.duration(150)}
              layout={LinearTransition}
              style={styles.stickyFilterBar}
            >
              <FilterBar />
            </Animated.View>
          )}
        </View>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FA287B' },
  content: { backgroundColor: colors.background, marginTop: spacing.xxl },
  stickyOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  stickyItem: {
    backgroundColor: colors.background,
    marginBottom: -spacing.sm,
  },
  stickyFilterBar: {
    backgroundColor: colors.background,
    paddingLeft: spacing.lg,
  },
});

export default HomeScreen;
