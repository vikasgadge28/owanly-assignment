import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';
import type { CuratedListItem } from '../../types/homepage';

interface Props {
  item: CuratedListItem;
  width?: number;
  onPress?: (item: CuratedListItem) => void;
}

/** Reusable "What's on your mind?" cuisine / category tile. */
function CategoryItem({ item, width = 72, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
      style={[styles.container, { width }]}>
      <Image
        source={{ uri: item.imageUrl }}
        style={[styles.image]}
        resizeMode="contain"
      />
      <Text style={styles.label} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  image: { backgroundColor: 'transparent', height: 86, width: 72 },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default React.memo(CategoryItem);
