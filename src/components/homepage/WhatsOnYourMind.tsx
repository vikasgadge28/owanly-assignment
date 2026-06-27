import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../constants/theme';
import { SectionHeader } from '../common';
import HorizontalCarousel from './HorizontalCarousel';
import CategoryItem from './CategoryItem';
import type { CuratedListItem } from '../../types/homepage';

interface Props {
  title?: string;
  items: CuratedListItem[];
}

/**
 * "What's on your mind?" cuisine grid.
 * config (curatedListGroups) provides the ordered ids; curated_list_details
 * provides display data. Rendered as a horizontal carousel for now.
 */
function WhatsOnYourMind({ title = "What's on your mind?", items }: Props) {
  if (!items?.length) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SectionHeader title={title} paddingLeft={26} />
      <HorizontalCarousel
        data={items}
        keyExtractor={item => item.id}
        contentPaddingLeft={26}
        renderItem={item => <CategoryItem item={item} />}
        gap={spacing.lg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 32,},
});

export default React.memo(WhatsOnYourMind);
