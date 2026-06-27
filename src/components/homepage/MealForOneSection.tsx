import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../constants/assets';
import { radius, spacing } from '../../constants/theme';
import HorizontalCarousel from './HorizontalCarousel';
import TopDealFoodCard from './TopDealFoodCard';
import type { CuratedListDetail, FoodItem } from '../../types/homepage';

const PINK = '#FA287B';
const DEFAULT_SECTION_BG = '#FFF8F1';
const TITLE_IMAGE_ASPECT_RATIO = 948 / 390;
const TITLE_IMAGE_HEIGHT = 80;
const TITLE_IMAGE_WIDTH = TITLE_IMAGE_HEIGHT * TITLE_IMAGE_ASPECT_RATIO;

function getSectionGradientColors(colour?: string): string[] {
  if (!colour) {
    return [DEFAULT_SECTION_BG, DEFAULT_SECTION_BG];
  }

  const hexColors = colour.match(/#[0-9A-Fa-f]{6}/g);
  if (hexColors?.length && hexColors.length > 1) {
    return hexColors;
  }

  if (hexColors?.length) {
    return [hexColors[0], hexColors[0]];
  }

  return colour.startsWith('#')
    ? [colour, colour]
    : [DEFAULT_SECTION_BG, DEFAULT_SECTION_BG];
}

interface Props {
  config?: CuratedListDetail;
  items: FoodItem[];
}

/** Top deals / meal-for-one carousel section. */
function MealForOneSection({ config, items }: Props) {
  const [useLocalTitleImage, setUseLocalTitleImage] = useState(false);

  if (!items?.length) {
    return null;
  }

  const titleSource =
    !useLocalTitleImage && config?.imageUrl
      ? { uri: config.imageUrl }
      : icons.topDealsTitle;

  return (
    <LinearGradient
      colors={getSectionGradientColors(config?.backGroundColour)}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.header}>
        <Image
          source={titleSource}
          style={styles.titleImage}
          resizeMode="contain"
          accessibilityLabel={config?.name ?? 'Top deals'}
          onError={() => setUseLocalTitleImage(true)}
        />

        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['rgb(255, 255, 253)', 'rgba(247, 236, 223, 0.41)']}
            start={{ x: 0, y: 0.8 }}
            end={{ x: 1, y: 1 }}
            style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all</Text>
            <Text style={styles.seeAllChevron}>›</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <HorizontalCarousel
        data={items}
        keyExtractor={item => item.foodItemId}
        renderItem={item => <TopDealFoodCard item={item} width={120} />}
        gap={spacing.lg}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  titleImage: {
    width: TITLE_IMAGE_WIDTH,
    height: TITLE_IMAGE_HEIGHT,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    gap: spacing.xxs,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: PINK,
  },
  seeAllChevron: {
    fontSize: 18,
    fontWeight: '600',
    color: PINK,
    lineHeight: 20,
    marginTop: -1,
  },
});

export default React.memo(MealForOneSection);
