import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';
import { useHomepage } from '../../hooks/useHomepage';
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

  return (
    <ErrorBoundary onReset={reload}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + spacing.xxl },
          ]}
        >
          <HomeTopSection bannerImageUrl={data.topBannerImage} />

          <ReorderSection
            config={restaurant.reOrderConfig}
            restaurants={data.reorder}
          />
          
             <WhatsOnYourMind
            title={restaurant.curatedListGroups?.[0]?.name}
            items={data.whatsOnYourMind}
          />

          <MealForOneSection
            config={mealForOneCfg.curatedListDetailsList?.[0]}
            items={data.mealForOne}
          />

          {data.curatedSections.map(section => (
            <RestaurantCuratedSection
              key={section.id}
              title={section.title}
              restaurants={section.restaurants}
            />
          ))}


          <RestaurantListing restaurants={data.restaurants} />
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FA287B' },
  content: { backgroundColor: colors.background, marginTop: 24 },
});

export default HomeScreen;
