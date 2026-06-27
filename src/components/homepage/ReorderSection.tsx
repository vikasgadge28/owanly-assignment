import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../constants/theme';
import { SectionHeader } from '../common';
import HorizontalCarousel from './HorizontalCarousel';
import RestaurantCard from './RestaurantCard';
import type { ReorderConfig, RestaurantEntity } from '../../types/homepage';

const SECTION_PADDING_LEFT = 26;

interface Props {
  config?: ReorderConfig;
  restaurants: RestaurantEntity[];
}

/** Reorder carousel: feed_config.reOrderConfig + past_orders. */
function ReorderSection({ config, restaurants }: Props) {
  if (!restaurants?.length) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SectionHeader
        title={config?.name || 'Order again'}
        paddingLeft={SECTION_PADDING_LEFT}
      />
      <HorizontalCarousel
        data={restaurants}
        keyExtractor={item => item.entityId}
        contentPaddingLeft={SECTION_PADDING_LEFT}
        disableOverscroll
        renderItem={item => (
          <RestaurantCard restaurant={item} variant="compact" />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.xl },
});

export default React.memo(ReorderSection);
