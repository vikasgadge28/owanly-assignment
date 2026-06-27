import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
import {
  HomeTopSection,
  MealForOneSection,
  ReorderSection,
  RestaurantCuratedSection,
  RestaurantListing,
  WhatsOnYourMind,
} from '../../components/homepage';

type HomeSection =
  | { type: 'top-banner' }
  | { type: 'reorder' }
  | { type: 'whats-on-your-mind' }
  | { type: 'meal-for-one' }
  | { type: 'curated-restaurants'; section: CuratedSection }
  | { type: 'restaurant-listing' };

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { status, data, reload } = useHomepage();

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
        return <RestaurantListing restaurants={data.restaurants} />;
      default:
        return null;
    }
  };

  const keyExtractor = (item: HomeSection) =>
    item.type === 'curated-restaurants'
      ? `${item.type}-${item.section.id}`
      : item.type;

  return (
    <ErrorBoundary onReset={reload}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + spacing.xxl },
          ]}
        />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FA287B' },
  content: { backgroundColor: colors.background, marginTop: 24 },
});

export default HomeScreen;
