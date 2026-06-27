import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing, typography } from '../../constants/theme';
import { RatingBadge, VegIndicator } from '../common';
import type { FoodItem } from '../../types/homepage';

interface Props {
  item: FoodItem;
  width?: number;
  onPress?: (item: FoodItem) => void;
}

/** Reusable meal-for-one food item card (horizontal carousel). */
function FoodCard({ item, width = 150, onPress }: Props) {
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
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Text style={styles.addText}>ADD</Text>
          {item.hasVariants ? <Text style={styles.customise}>customisable</Text> : null}
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <VegIndicator type={item.vegOrNonVeg} size={12} />
          <Text style={styles.price}>₹{item.displayPrice ?? item.price}</Text>
        </View>
        <Text style={typography.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.resName} numberOfLines={1}>
          {item.resName}
        </Text>
        <View style={styles.metaRow}>
          <RatingBadge value={item.ResRatingResponse?.value} compact />
          {item.etaInMinutes ? (
            <Text style={styles.eta}>{item.etaInMinutes} min</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  image: { width: '100%', height: '100%' },
  addButton: {
    position: 'absolute',
    bottom: -spacing.xs,
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  addText: { ...typography.body, fontWeight: '700', color: colors.primary },
  customise: { color: colors.textTertiary, fontSize: 8 },
  body: { paddingTop: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxs,
  },
  price: { ...typography.price },
  resName: { ...typography.caption, marginTop: spacing.xxs },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  eta: { ...typography.caption, marginLeft: spacing.sm },
});

export default React.memo(FoodCard);
