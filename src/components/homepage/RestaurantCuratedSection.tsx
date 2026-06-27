import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../constants/theme';
import { SectionHeader } from '../common';
import HorizontalCarousel from './HorizontalCarousel';
import RestaurantCard from './RestaurantCard';
import type { RestaurantEntity } from '../../types/homepage';

interface Props {
  title: string;
  restaurants: RestaurantEntity[];
}

/** Curated restaurant carousel (e.g. "Known & Loved"). */
function RestaurantCuratedSection({ title, restaurants }: Props) {
  if (!restaurants?.length) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SectionHeader title={title} />
      <HorizontalCarousel
        data={restaurants}
        keyExtractor={item => item.entityId}
        renderItem={item => (
          <RestaurantCard restaurant={item} variant="compact" width={170} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.xl },
});

export default React.memo(RestaurantCuratedSection);
