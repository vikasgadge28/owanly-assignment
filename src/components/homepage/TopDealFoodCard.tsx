import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { icons } from '../../constants/assets';
import { colors, radius, spacing, typography } from '../../constants/theme';
import type { FoodItem } from '../../types/homepage';

const PINK = '#FF297D';
const CARD_IMAGE_SIZE = 120;

interface Props {
  item: FoodItem;
  width?: number;
  onPress?: (item: FoodItem) => void;
}

function getPrices(item: FoodItem) {
  const currentPrice = item.displayPrice ?? item.price;
  const originalPrice = item.displayMarkupPrice ?? item.markUpDisplayPrice;
  const showOriginal =
    originalPrice != null && originalPrice > currentPrice;

  return { currentPrice, originalPrice, showOriginal };
}

function getFoodTypeColor(type?: string) {
  return (type ?? '').toLowerCase() === 'veg' ? colors.veg : '#FF4141';
}

function getTitleLines(name: string) {
  const [firstWord, ...remainingWords] = name.trim().split(/\s+/);

  return {
    firstLine: firstWord,
    secondLine: remainingWords.join(' '),
  };
}

/** Top-deals food card used in the meal-for-one horizontal carousel. */
function TopDealFoodCard({ item, width = CARD_IMAGE_SIZE, onPress }: Props) {
  const { currentPrice, originalPrice, showOriginal } = getPrices(item);
  const rating = item.ResRatingResponse?.value;
  const foodTypeColor = getFoodTypeColor(item.vegOrNonVeg);
  const titleLines = getTitleLines(item.name);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
      style={[styles.card, { width }]}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.addButton} activeOpacity={0.85}>
          <Image source={icons.plus} style={styles.addIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleBlock}>
        <View style={styles.titleRow}>
          <View style={[styles.foodTypeBox, { borderColor: foodTypeColor }]}>
            <View
              style={[styles.foodTypeDot, { backgroundColor: foodTypeColor }]}
            />
          </View>
          <Text style={styles.nameFirstLine} numberOfLines={1}>
            {titleLines.firstLine}
          </Text>
        </View>
        {titleLines.secondLine ? (
          <Text style={styles.nameSecondLine} numberOfLines={1}>
            {titleLines.secondLine}
          </Text>
        ) : null}
      </View>

      <View style={styles.priceRow}>
        <View style={styles.pricePillAccent}>
          <View style={styles.pricePill}>
            <Text style={styles.currentPrice}>₹{currentPrice}</Text>
          </View>
        </View>
        {showOriginal ? (
          <Text style={styles.originalPrice}>₹{originalPrice}</Text>
        ) : null}
      </View>

      <View style={styles.metaRow}>
        {rating != null ? (
          <View style={styles.ratingGroup}>
            <Image source={icons.star} style={styles.starIcon} />
            <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
          </View>
        ) : null}
        {item.etaInMinutes ? (
          <View style={styles.etaGroup}>
            <Image source={icons.bolt} style={styles.etaIcon} />
            <Text style={styles.eta}>{item.etaInMinutes} mins</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.resName} numberOfLines={1}>
        {item.resName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
  },
  imageWrap: {
    width: CARD_IMAGE_SIZE,
    height: CARD_IMAGE_SIZE,
    borderRadius: radius.xl,
    overflow: 'visible',
    backgroundColor: colors.surfaceMuted,
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.xl,
  },
  addButton: {
    position: 'absolute',
    right: spacing.xs,
    bottom: spacing.xs,
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: PINK,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  addIcon: {
    width: 15,
    height: 15,
  },
  titleBlock: {
    marginBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  foodTypeBox: {
    width: 22,
    height: 15,
    borderWidth: 2,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  foodTypeDot: {
    width: 13,
    height: 7,
    borderRadius: radius.pill,
  },
  nameFirstLine: {
    flex: 1,
    ...typography.cardTitle,
    fontWeight: '500',
  },
  nameSecondLine: {
    ...typography.cardTitle,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  pricePillAccent: {
    backgroundColor: PINK,
    borderRadius: radius.pill,
    paddingBottom: 2,
  },
  pricePill: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: PINK,
  },
  originalPrice: {
    ...typography.price,
    fontWeight: '400',
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs + 1,
  },
  starIcon: {
    width: 12,
    height: 12,
  },
  ratingValue: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.rating,
  },
  etaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  etaIcon: {
    width: 14,
    height: 14,   
  },
  eta: {
    ...typography.caption,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  resName: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textTertiary,
  },
});

export default React.memo(TopDealFoodCard);
